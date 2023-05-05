module SM.Model where

import Prelude

import Control.Monad.Gen.Trans (Gen)
import Control.Monad.Rec.Class (tailRecM, Step(..))
import Data.Array (all, cons, elem, filter, foldr, snoc, sort)
import Data.Map (Map)
import Data.Map as Map
import Data.Maybe (Maybe(..))
import SM.Graph ( GraphWithBalls, source, addBallsToGraph, expertPlays, losingPositions, machinePlays, randomPlays
                , substractGraph, kingGraph'
                )

data Adversary = Random | Expert | Machine

derive instance Eq Adversary

data Status = Running | IsStopping | Stopped

derive instance Eq Status

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
  = Substract Int (Array Int)
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
  , graphWithBalls ∷ GraphWithBalls Int Int
  , losingPositions ∷ Map Int Boolean
  , status ∷ Status
  , gameResult ∷ Maybe GameResult
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

adversaryPlays ∷ Model → Int → Gen (Maybe { edge :: Int, dest :: Int })
adversaryPlays model pos =
  case model.config.adversary of
    Random → randomPlays model.graphWithBalls pos
    Expert → expertPlays model.graphWithBalls model.losingPositions pos
    Machine → machinePlays model.graphWithBalls pos

machinePlays' ∷ Model → Int → Gen (Maybe { edge :: Int, dest :: Int })
machinePlays' model = machinePlays model.graphWithBalls

runGame ∷ Model → Gen GameResult
runGame model = tailRecM go { moves: [], pos: model.source, isMachineTurn: model.config.machineStarts }
  where
  go { pos, moves, isMachineTurn } = do
    mmove ← (if isMachineTurn then machinePlays' else adversaryPlays) model pos
    case mmove of
      Nothing → pure $ Done { moves, win: not isMachineTurn }
      Just { edge, dest } → pure $ Loop
        { moves: snoc moves { pos, edge, isMachineTurn }
        , isMachineTurn: not isMachineTurn
        , pos: dest
        }

adjustBalls ∷ Model → GameResult → Model
adjustBalls model { moves, win } =
  model
    { graphWithBalls = graphWithBalls
    , nbVictories = model.nbVictories + (if win then 1 else 0)
    , nbLosses = model.nbLosses + (if win then 0 else 1)
    , gameResult = Just { moves, win }
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

  graphWithBalls = moves
    # foldr
        ( \{ isMachineTurn, pos, edge } →
            flip Map.update pos
              ( Just <<< map \nbor@{ edge: e, nbBalls } ->
                  if edge /= e then nbor
                  else nbor { nbBalls = adjustBalls' isMachineTurn nbBalls }
              )
        )
        model.graphWithBalls
    <#> \balls →
      if all ((_ == 0) <<< _.nbBalls) balls then balls <#> _ { nbBalls = model.config.ballsPerColor }
      else balls

nextGame ∷ Model → Gen Model
nextGame st = runGame st <#> adjustBalls st

initMachine ∷ Model → Model
initMachine model =
  let
    graph = case model.config.graphType of
      Substract nb possibleMoves → substractGraph nb possibleMoves
      King n m → kingGraph' n m
    graphWithBalls = addBallsToGraph model.config.ballsPerColor graph
    losing = losingPositions graph
  in
    model
      { graphWithBalls = graphWithBalls
      , source = source graph
      , nbVictories = 0
      , nbLosses = 0
      , losingPositions = losing
      , status = Stopped
      , gameResult = Nothing
      }

init ∷ Model
init = initMachine
  { config
  , source: 0
  , nbVictories: 0
  , nbLosses: 0
  , graphWithBalls: Map.empty
  , losingPositions: Map.empty
  , status: Stopped
  , gameResult: Nothing
  }
  where
  config =
    { graphType: Substract 8 [ 1, 2 ]
    , adversary: Random
    , ballsPerColor: 6
    , reward: 3
    , penalty: -1
    , machineStarts: true
    }