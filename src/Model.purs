module SM.Model where

import Prelude

import Control.Monad.Rec.Class (tailRecM, Step(..))
import Data.Array ((!!))
import Data.Array as Array
import Data.Int as Int
import Data.Lazy (defer, force)
import Data.Lens ((%~))
import Data.Lens.Index (ix)
import Data.Maybe (Maybe(..), fromMaybe, maybe)
import Effect (Effect)
import Effect.Random (randomInt)
import SM.Util (repeat, randomPick)

data Adversary = Random | Expert | Machine
derive instance Eq Adversary

data Status = Running | IsStopping | Stopped
derive instance Eq Status 

type GameResult = { moves ∷ Array { isMachineTurn ∷ Boolean, pos ∷ Int, move ∷ Int, taken ∷ Int}
                  , win ∷ Boolean
                  }
type Config =
    {   possibleMoves ∷ Array Int
    ,   adversary ∷ Adversary
    ,   nbPigeonholes ∷ Int
    ,   ballsPerColor ∷ Int
    ,   reward ∷ Int
    ,   penalty ∷ Int
    ,   machineStarts ∷ Boolean
    }

type RawConfig =
    {   possibleMoves ∷ Array Boolean
    ,   adversary ∷ String
    ,   nbPigeonholes ∷ Int
    ,   ballsPerColor ∷ Int
    ,   reward ∷ String
    ,   penalty ∷ String
    ,   machineStarts ∷ Boolean
    }

type State = 
    {   config ∷ Config
    ,   rawConfig ∷ RawConfig
    ,   nbVictories ∷ Int
    ,   nbLosses ∷ Int
    ,   nbBalls ∷ Array (Array Int)
    ,   losingPositions ∷ Array Boolean
    ,   status ∷ Status
    ,   gameResult ∷ Maybe GameResult
    }

-- convertPossibleMoves [false, true, true, false, fale] = [2, 3]
convertPossibleMoves ∷ Array Boolean → Array Int
convertPossibleMoves = Array.catMaybes <<< Array.mapWithIndex \i b → if b then Just (i + 1) else Nothing

rawConfigToConfig ∷ RawConfig → Maybe Config
rawConfigToConfig c = do
    let possibleMoves = convertPossibleMoves c.possibleMoves
    adversary ← case c.adversary of
                    "random" → Just Random
                    "expert" → Just Expert
                    "machine" → Just Machine
                    _ → Nothing
    let nbPigeonholes = c.nbPigeonholes
    let ballsPerColor = c.ballsPerColor
    reward ← Int.fromString c.reward
    penalty ← Int.fromString c.penalty
    let machineStarts = c.machineStarts
    pure {possibleMoves, adversary, nbPigeonholes, ballsPerColor, reward, penalty, machineStarts}

-- | renvoie l'ensemble des positions perdantes pour une taille et un ensemble de mouvements donnés
losingPositions ∷ Int → Array Int → Array Boolean
losingPositions size moves = t <#> force where
    t = repeat size \i → defer
            \_ → moves # Array.all \m → maybe true (not <<< force) (t !! (i - m))

-- les 4 fonctions suivantes renvoient l'index dans posssibleMoves du coup
randomPlays ∷ State → Int → Effect (Maybe Int)
randomPlays st pos =
    let nbBalls = fromMaybe [] (st.nbBalls !! (pos-1)) in
    if Array.null nbBalls then
        pure Nothing
    else
        Just <$> randomInt 0 (Array.length nbBalls - 1)

expertPlays ∷ State → Int → Effect (Maybe Int)
expertPlays st pos
    | st.losingPositions !! pos == Just true = randomPlays st pos
    | otherwise = pure $ st.config.possibleMoves # Array.findIndex (\move → st.losingPositions !! (pos - move) == Just true)

machinePlays ∷ State → Int → Effect (Maybe Int)
machinePlays st pos =
    let nbBalls = fromMaybe [] (st.nbBalls !! (pos-1)) in
    nbBalls # Array.mapWithIndex (flip Array.replicate)
            # Array.concat
            # randomPick

adversaryPlays ∷ State → Int → Effect (Maybe Int)
adversaryPlays st pos =
    case st.config.adversary of
        Random → randomPlays st pos
        Expert → expertPlays st pos
        Machine → machinePlays st pos

runGame ∷ State → Effect GameResult
runGame st = tailRecM go {moves: [], pos: st.config.nbPigeonholes, isMachineTurn: st.config.machineStarts} where
    go {pos, moves, isMachineTurn} = do
        mmove ← (if isMachineTurn then machinePlays else adversaryPlays) st pos
        case mmove of
            Nothing → pure $ Done {moves, win: not isMachineTurn}
            Just move → pure $ Loop { moves: moves `Array.snoc` { pos
                                                                , move
                                                                , taken: fromMaybe 0 $ st.config.possibleMoves !! move
                                                                , isMachineTurn
                                                                }
                                    , isMachineTurn: not isMachineTurn
                                    , pos: pos - (st.config.possibleMoves !! move # fromMaybe 0)
                                    }

adjustBalls ∷ State → GameResult → State
adjustBalls st {moves, win} = 
    let nbBalls = moves # Array.foldl 
                            (\acc {isMachineTurn, pos, move} →
                                acc # ix (pos-1) <<< ix move %~ \x →
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
                                            Array.replicate (Array.length balls) st.config.ballsPerColor
                                        else
                                            balls
                            
    in st { nbBalls = nbBalls
          , nbVictories = st.nbVictories + (if win then 1 else 0) 
          , nbLosses = st.nbLosses + (if win then 0 else 1)
          , gameResult = Just {moves, win}
          }

nextGame ∷ State → Effect State
nextGame st = runGame st <#> adjustBalls st

initMachine ∷ State → State
initMachine st =
    st { nbBalls = repeat st.config.nbPigeonholes \i →
                        Array.replicate
                            (Array.length $ st.config.possibleMoves # Array.filter \j → i + 1 - j >= 0)
                            st.config.ballsPerColor
       , nbVictories = 0
       , nbLosses = 0
       , losingPositions = losingPositions st.config.nbPigeonholes st.config.possibleMoves
       , status = Stopped
       , gameResult = Nothing
       }

state ∷ State
state = initMachine
    {   config: 
        {   possibleMoves: [1, 2]
        ,   adversary: Random
        ,   nbPigeonholes: 8
        ,   ballsPerColor: 6
        ,   reward: 3
        ,   penalty: -1
        ,   machineStarts: true
        }
    ,   rawConfig:
        {   possibleMoves: [true, true, false, false, false]
        ,   adversary: "random"
        ,   nbPigeonholes: 8
        ,   ballsPerColor: 6
        ,   reward: "3"
        ,   penalty: "-1"
        ,   machineStarts: true
        }
    ,   nbVictories: 0
    ,   nbLosses: 0
    ,   nbBalls: []
    ,   losingPositions: []
    ,   status: Stopped
    ,   gameResult: Nothing
    }