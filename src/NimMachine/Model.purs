module NimMachine.Model where

import Relude

import Data.Map as Map
import Data.Set as Set
import NimMachine.Graph
  ( Machine
  , GraphDisplayer
  , graphToMachine
  , defaultDisplayer
  , expertPlays
  , kingDisplayer
  , kingGraph'
  , losingPositions
  , machinePlays
  , randomPlays
  , source
  , nimDisplayer
  , nimGraph
  )

data Adversary = Random | Expert | Machine

derive instance Eq Adversary

data Status = Running | IsStopping | Stopped

derive instance Eq Status

baseColors ∷ Array String
baseColors =
  [ "#f6b73c" -- yellow
  , "#ff0000" --red
  , "#00ffff" --cyan"
  , "#90ee90" -- light green 
  , "#900090" --magenta" 
  ]

type GameResult =
  { moves ∷
      Array
        { isMachineTurn ∷ Boolean
        , pos ∷ Int
        , edge ∷ Int -- le nombre de jetons pris
        }
  , win ∷ Boolean -- est-ce une victoire pour la machine?
  }

data GraphType
  = Nim Int (Array Int)
  | King Int Int

type Config =
  { graphType ∷ GraphType
  , adversary ∷ Adversary
  , ballsPerColor ∷ Int
  , reward ∷ Int
  , penalty ∷ Int
  , machineStarts ∷ Boolean
  }

type Model =
  { config ∷ Config
  , source ∷ Int
  , nbVictories ∷ Int
  , nbLosses ∷ Int
  , machine ∷ Machine Int Int
  , losingPositions ∷ Set Int
  , status ∷ Status
  , displayer ∷ GraphDisplayer Int Int
  , colors ∷ Array String
  , fastMode ∷ Boolean
  }

adversaryFromString ∷ String → Adversary
adversaryFromString "expert" = Expert
adversaryFromString "machine" = Machine
adversaryFromString _ = Random

adversaryToString ∷ Adversary → String
adversaryToString Expert = "expert"
adversaryToString Machine = "machine"
adversaryToString Random = "random"

updatePossibleMoves ∷ Int → Array Int → Array Int
updatePossibleMoves x moves
  | elem x moves = moves # filter (_ /= x)
  | otherwise = moves # cons x # sort

adversaryPlays ∷ Model → Int → Gen (Maybe { edge ∷ Int, dest ∷ Int })
adversaryPlays model pos =
  case model.config.adversary of
    Random → randomPlays model.machine pos
    Expert → expertPlays model.machine model.losingPositions pos
    Machine → machinePlays model.machine pos

machinePlays' ∷ Model → Int → Gen (Maybe { edge ∷ Int, dest ∷ Int })
machinePlays' model = machinePlays model.machine

-- | lance une partie et renvoie le résultat
runGame ∷ Model → Gen GameResult
runGame model = go { moves: [], pos: model.source, isMachineTurn: model.config.machineStarts }
  where
  go { pos, moves, isMachineTurn } = do
    mmove ← (if isMachineTurn then machinePlays' else adversaryPlays) model pos
    case mmove of
      Nothing → pure { moves, win: not isMachineTurn }
      Just { edge, dest } → go
        { moves: snoc moves { pos, edge, isMachineTurn }
        , isMachineTurn: not isMachineTurn
        , pos: dest
        }

-- | ajuste le nombre de balles de chaque casier de la machine en fonction du résultat de la partie
adjustBalls ∷ Model → GameResult → Model
adjustBalls model { moves, win } =
  model
    { machine = machine
    , nbVictories = model.nbVictories + (if win then 1 else 0)
    , nbLosses = model.nbLosses + (if win then 0 else 1)
    }
  where
  adjustBalls' isMachineTurn nbBalls =
    max 0
      ( nbBalls +
          ( if not isMachineTurn && model.config.adversary /= Machine then
              0
            else if win == isMachineTurn then
              model.config.reward
            else
              model.config.penalty
          )
      )

  machine = moves
    # foldr
        ( \{ isMachineTurn, pos, edge } →
            flip Map.update pos
              ( Just <<< map \nbor@{ edge: e, nbBalls } →
                  if edge /= e then nbor
                  else nbor { nbBalls = adjustBalls' isMachineTurn nbBalls }
              )
        )
        model.machine
    <#> \balls →
      -- si il n'y a plus de balles dans un casier, on en remet
      if all ((_ == 0) <<< _.nbBalls) balls then
        balls <#> _ { nbBalls = model.config.ballsPerColor }
      else
        balls

-- | simule une partie et ajuste les billes en fonction du résultat
nextGame ∷ Model → Gen Model
nextGame model = runGame model <#> adjustBalls model

-- | (ré)initialise les casiers en fonction de la configuration
-- | et arrête la machine
initMachine ∷ Model → Model
initMachine model =
  model
    { machine = machine
    , source = source graph
    , nbVictories = 0
    , nbLosses = 0
    , losingPositions = losingPositions graph
    , status = Stopped
    , displayer = displayer
    }
  where
  graph = case model.config.graphType of
    Nim nb possibleMoves → nimGraph nb possibleMoves
    King n m → kingGraph' n m
  machine = graphToMachine model.config.ballsPerColor graph
  displayer = case model.config.graphType of
    Nim _ moves → nimDisplayer moves
    King n m → kingDisplayer n m

-- | modèle initial
init ∷ Model
init = initMachine
  { config
  , source: 0
  , nbVictories: 0
  , nbLosses: 0
  , machine: Map.empty
  , losingPositions: Set.empty
  , status: Stopped
  , displayer: defaultDisplayer
  , colors: baseColors
  , fastMode: false
  }
  where
  config =
    { graphType: Nim 8 [ 1, 2 ]
    , adversary: Random
    , ballsPerColor: 6
    , reward: 3
    , penalty: -1
    , machineStarts: true
    }