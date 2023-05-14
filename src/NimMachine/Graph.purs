module NimMachine.Graph where

import Prelude

import Control.Alternative (guard)
import Control.Monad.Gen.Trans (Gen)
import Data.Array ((..), all, filter, find, replicate)
import Data.Int (toNumber)
import Data.Lazy (defer, force)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Data.Tuple (Tuple)
import Data.Tuple.Nested ((/\))
import NimMachine.Util (randomPick)

data Graph v e = Graph (Map v (Array { edge ∷ e, dest ∷ v })) v
type Legend e = Array { edge ∷ e, name ∷ String }

type GraphDisplayer v e =
  { width ∷ Int
  , height ∷ Int
  , position ∷ v → Maybe { x ∷ Number, y ∷ Number }
  , legend ∷ Legend e
  , vertexLabel ∷ v → Maybe String
  }

defaultDisplayer ∷ forall v e. GraphDisplayer v e
defaultDisplayer =
  { width: 0
  , height: 0
  , position: const Nothing
  , legend: []
  , vertexLabel: const Nothing
  }

source ∷ ∀ v e. Graph v e → v
source (Graph _ s) = s

mapVertices ∷ ∀ v v' e. Ord v' ⇒ (v → v') → Graph v e → Graph v' e
mapVertices f (Graph graph v) = Graph (Map.fromFoldable elems') (f v)
  where
  elems = Map.toUnfoldable graph ∷ Array _
  elems' = elems <#> \(i /\ nbors) → (f i /\ (nbors <#> \{ edge, dest } → { edge, dest: f dest }))

-- | représente un casier
type MachineBox v e = Array { edge ∷ e, dest ∷ v, nbBalls ∷ Int }

-- | représente l'ensemble des casiers
type Machine v e = Map v (MachineBox v e)

graphToMachine ∷ ∀ v e. Ord v ⇒ Int → Graph v e → Machine v e
graphToMachine nbBalls (Graph graph _) = graph <#> map \{ edge, dest } → { edge, dest, nbBalls }

nimGraph ∷ Int → Array Int → Graph Int Int
nimGraph n moves = Graph (Map.fromFoldable $ 0 .. n <#> \i → i /\ nbors i) n
  where
  nbors i = do
    j ← moves
    guard (i - j >= 0)
    pure { edge: j - 1, dest: i - j }

nimDisplayer ∷ Array Int → GraphDisplayer Int Int
nimDisplayer moves =
  { width: 800
  , height: 400
  , position: \v →
      if v == 0 then Nothing
      else if v <= 8 then Just { x: toNumber (v - 1) * 100.0, y: 0.0 }
      else Just { x: toNumber (v - 9) * 100.0, y: 200.0 }
  , legend: moves <#> \e → { edge: e - 1, name: show e }
  , vertexLabel: Just <<< show
  }

kingGraph ∷ Int → Int → Graph (Tuple Int Int) Int
kingGraph width height = Graph graph $ (width - 1) /\ (height - 1)
  where
  graph = Map.fromFoldable $ do
    i ← 0 .. (width - 1)
    j ← 0 .. (height - 1)
    pure $ (i /\ j) /\ nbors i j
  nbors i j =
    [ { edge: 0, dest: (i - 1) /\ j }
    , { edge: 1, dest: (i - 1) /\ (j - 1) }
    , { edge: 2, dest: i /\ (j - 1) }
    ] # filter \{ dest: i' /\ j' } → i' >= 0 && j' >= 0

kingGraph' ∷ Int → Int → Graph Int Int
kingGraph' width height =
  kingGraph width height
    # mapVertices \(i /\ j) → i + j * width

kingDisplayer ∷ Int → Int → GraphDisplayer Int Int
kingDisplayer width height =
  { width: 180 * maxdim
  , height: 180 * maxdim
  , position: \v →
      if v == 0 then Nothing
      else Just
        { x: 50.0 + 180.0 * toNumber (v `mod` width)
        , y: 10.0 + 180.0 * toNumber (height - v `div` width - 1)
        }
  , legend: [ { edge: 0, name: "⇐" }, { edge: 1, name: "⇙" }, { edge: 2, name: "⇓" } ]
  , vertexLabel: const Nothing
  }
  where
  maxdim = max width height

losingPositions ∷ ∀ v e. Ord v ⇒ Graph v e → Map v Boolean
losingPositions (Graph graph _) = force <$> t
  where
  t = graph <#> \nbors → defer \_ →
    nbors # all \{ dest } → maybe true (not <<< force) (Map.lookup dest t)

randomPlays
  ∷ ∀ v e
  . Ord v
  ⇒ Machine v e
  → v
  → Gen (Maybe { edge ∷ e, dest ∷ v })
randomPlays graph v = do
  case Map.lookup v graph of
    Nothing → pure Nothing
    Just nbors → randomPick nbors <#> map \{ edge, dest } → { edge, dest }

-- | joue le coup optimal si il existe, sinon joue un coup aléatoire
expertPlays
  ∷ ∀ v e
  . Ord v
  ⇒ Machine v e
  → Map v Boolean
  → v
  → Gen (Maybe { edge ∷ e, dest ∷ v })
expertPlays graph losing v
  | Map.lookup v losing == Just true = randomPlays graph v
  | otherwise = pure $ do
      nbors ← Map.lookup v graph
      { edge, dest } ← nbors # find \{ dest } → Map.lookup dest losing == Just true
      pure { edge, dest }

-- | joue au hasard en fonction du nombre de balles de chaque couleur dans le casier
machinePlays
  ∷ ∀ v e
  . Ord v
  ⇒ Machine v e
  → v
  → Gen (Maybe { edge ∷ e, dest ∷ v })
machinePlays balls v =
  randomPick $ balls' >>= \{ edge, dest, nbBalls } → replicate nbBalls { dest, edge }
  where
  balls' = fromMaybe [] (Map.lookup v balls)