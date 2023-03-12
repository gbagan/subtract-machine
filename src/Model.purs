module SM.Model where

import Prelude

import Control.Monad.Rec.Class (class MonadRec, tailRecM, Step(..))
import Data.Array ((!!))
import Data.Array as Array
import Data.Lazy (defer, force)
import Data.Lens ((%~))
import Data.Lens.Index (ix)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import SM.Random (class Random)
import SM.Random as Random
import SM.Util (repeat)

data Adversary = Random | Expert | Machine
derive instance Eq Adversary

data Status = Running | IsStopping | Stopped
derive instance Eq Status

type GameResult = { moves ∷ Array { isMachineTurn ∷ Boolean
                                  , pos ∷ Int
                                  , move ∷ Int -- l'index dans config.playerMoves du coup joué
                                  , taken ∷ Int -- le nombre de jetons pris
                                  }
                  , win ∷ Boolean -- est-ce une victoire pour la machine?
                  }
type Config =
  { possibleMoves ∷ Array Int
  , adversary ∷ Adversary
  , nbPigeonholes ∷ Int
  , ballsPerColor ∷ Int
  , reward ∷ Int
  , penalty ∷ Int
  , machineStarts ∷ Boolean
  }

type State = 
  { config ∷ Config
  , rawConfig ∷ Config
  , nbVictories ∷ Int
  , nbLosses ∷ Int
  , nbBalls ∷ Array (Array Int)
  , losingPositions ∷ Array Boolean
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
updatePossibleMoves x moves | Array.elem x moves = moves # Array.filter (_ /= x)
                            | otherwise = moves # Array.cons x # Array.sort

-- | renvoie l'ensemble des positions perdantes pour le joueur qui va jouer
losingPositions ∷ Int → Array Int → Array Boolean
losingPositions size moves = force <$> t where
  t = repeat size \i → defer
        \_ → moves # Array.all \m → maybe true (not <<< force) (t !! (i - m))

-- les 4 fonctions suivantes renvoient l'index dans posssibleMoves du coup joué
randomPlays ∷ ∀m. Random m ⇒ State → Int → m (Maybe Int)
randomPlays st pos =
  let nbBalls = fromMaybe [] (st.nbBalls !! (pos-1))
  in
  if Array.null nbBalls then
    pure Nothing
  else
    Just <$> Random.int 0 (Array.length nbBalls - 1)

expertPlays ∷ ∀m. Random m ⇒ State → Int → m (Maybe Int)
expertPlays st pos
    | st.losingPositions !! pos == Just true = randomPlays st pos
    | otherwise = pure $ st.config.possibleMoves # Array.findIndex (\move → st.losingPositions !! (pos - move) == Just true)

machinePlays ∷ ∀m. Random m ⇒ State → Int → m (Maybe Int)
machinePlays st pos =
    let nbBalls = fromMaybe [] (st.nbBalls !! (pos-1)) in
    nbBalls # Array.mapWithIndex (flip Array.replicate)
            # Array.concat
            # Random.pick

adversaryPlays ∷ ∀m. Random m ⇒ State → Int → m (Maybe Int)
adversaryPlays st pos =
    case st.config.adversary of
        Random → randomPlays st pos
        Expert → expertPlays st pos
        Machine → machinePlays st pos

runGame ∷ ∀m. MonadRec m ⇒ Random m ⇒ State → m GameResult
runGame st = tailRecM go {moves: [], pos: st.config.nbPigeonholes, isMachineTurn: st.config.machineStarts} where
    go {pos, moves, isMachineTurn} = do
        mmove ← (if isMachineTurn then machinePlays else adversaryPlays) st pos
        case mmove of
            Nothing → pure $ Done {moves, win: not isMachineTurn}
            Just move → pure $ Loop { moves: Array.snoc moves { pos
                                                              , move
                                                              , taken: fromMaybe 0 (st.config.possibleMoves !! move)
                                                              , isMachineTurn
                                                              }
                                    , isMachineTurn: not isMachineTurn
                                    , pos: pos - fromMaybe 0 (st.config.possibleMoves !! move)
                                    }

adjustBalls ∷ State → GameResult → State
adjustBalls st {moves, win} = 
    let nbBalls = moves # Array.foldr
                            (\{isMachineTurn, pos, move} →
                                ix (pos-1) <<< ix move %~ \x →
                                    max 0 (x + 
                                        (if not isMachineTurn && st.config.adversary /= Machine then
                                            0
                                        else if win == isMachineTurn then
                                            st.config.reward
                                        else
                                            st.config.penalty
                                        ))
                            ) st.nbBalls
                        <#> \balls → if Array.all (_ == 0) balls then 
                                            balls <#> const st.config.ballsPerColor
                                        else
                                            balls
                            
    in st { nbBalls = nbBalls
          , nbVictories = st.nbVictories + (if win then 1 else 0) 
          , nbLosses = st.nbLosses + (if win then 0 else 1)
          , gameResult = Just {moves, win}
          }

nextGame ∷ ∀m. MonadRec m ⇒ Random m ⇒ State → m State
nextGame st = runGame st <#> adjustBalls st

initMachine ∷ State → State
initMachine st =
    st { nbBalls = repeat st.config.nbPigeonholes \i →
                        st.config.possibleMoves 
                        # Array.filter (\j → i + 1 - j >= 0)
                        <#> const st.config.ballsPerColor
       , nbVictories = 0
       , nbLosses = 0
       , losingPositions = losingPositions st.config.nbPigeonholes st.config.possibleMoves
       , status = Stopped
       , gameResult = Nothing
       }

state ∷ State
state = initMachine
  { config
  , rawConfig: config
  , nbVictories: 0
  , nbLosses: 0
  , nbBalls: []
  , losingPositions: []
  , status: Stopped
  , gameResult: Nothing
  }
  where
  config =
        { possibleMoves: [1, 2]
        , adversary: Random
        , nbPigeonholes: 8
        , ballsPerColor: 6
        , reward: 3
        , penalty: -1
        , machineStarts: true
        }