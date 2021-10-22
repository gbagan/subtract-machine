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

type ConfigState =
    {   possibleMoves :: Array Int
    ,   adversary :: Adversary
    ,   nbPigeonholes :: Int
    ,   ballsPerColor :: Int
    ,   reward :: Int
    ,   penalty :: Int
    ,   machineStarts :: Boolean
    }

type RawConfig =
    {   possibleMoves :: Array Boolean
    ,   adversary :: String
    ,   nbPigeonholes :: String
    ,   ballsPerColor :: String
    ,   reward :: String
    ,   penalty :: String
    ,   machineStarts :: String
    }

type RootState = 
    { config :: ConfigState
    , rawConfig :: RawConfig
    , nbVictories :: Int
    , nbLosses :: Int
    , nbBalls :: Array (Array Int)
    , losingPositions :: Array Boolean
    }

convertPossibleMoves :: Array Boolean -> Array Int
convertPossibleMoves = Array.catMaybes <<< Array.mapWithIndex \i b -> if b then Just (i + 1) else Nothing

rawConfigToConfig :: RawConfig -> Maybe ConfigState
rawConfigToConfig c = do
    let possibleMoves = convertPossibleMoves c.possibleMoves
    adversary <- case c.adversary of
                    "random" -> Just Random
                    "expert" -> Just Expert
                    "machine" -> Just Machine
                    _ -> Nothing
    nbPigeonholes <- Int.fromString c.nbPigeonholes
    ballsPerColor <- Int.fromString c.ballsPerColor
    reward <- Int.fromString c.reward
    penalty <- Int.fromString c.penalty
    let machineStarts = c.machineStarts == "y"
    pure {possibleMoves, adversary, nbPigeonholes, ballsPerColor, reward, penalty, machineStarts}

-- | renvoie l'ensemble des positions perdantes pour une taille et un ensemble de mouvements donnés
losingPositions ∷ Int → Array Int → Array Boolean
losingPositions size moves = t <#> force where
    t = repeat size \i → defer
            \_ → i == 0 || (moves # Array.all \m → maybe false (not <<< force) (t !! (i - m)))

randomPlays :: RootState -> Int -> Effect (Maybe Int)
randomPlays st pos =
    let nbBalls = fromMaybe [] (st.nbBalls !! (pos-1)) in
    if nbBalls == [] then
        pure Nothing
    else
        Just <$> randomInt 0 (Array.length nbBalls - 1)

-- | renvoie l'index du meilleur coup pour un joueur expert
expertPlays :: RootState -> Int -> Effect (Maybe Int)
expertPlays st pos
    -- | Array.null moves             = pure Nothing
    | st.losingPositions !! (pos) == Just true = pure Nothing
    | otherwise = pure Nothing

machinePlays :: RootState -> Int -> Effect (Maybe Int)
machinePlays st pos =
    let nbBalls = fromMaybe [] (st.nbBalls !! (pos-1)) in
    nbBalls # Array.mapWithIndex (flip Array.replicate)
            # Array.concat
            # randomPick

adversaryPlays :: RootState -> Int -> Effect (Maybe Int)
adversaryPlays st pos =
    case st.config.adversary of
        Random -> randomPlays st pos
        Expert -> machinePlays st pos
        Machine -> machinePlays st pos

runGame :: RootState -> Effect { moves :: Array { firstPlayer :: Boolean, pos :: Int, move :: Int} , win :: Boolean }
runGame st = tailRecM go {moves: [], pos: st.config.nbPigeonholes} where
    go {pos, moves} = do
        mmove <- machinePlays st pos
        case mmove of
            Nothing -> pure $ Done {moves, win: false}
            Just move -> do
                let pos2 = pos - (st.config.possibleMoves !! move # fromMaybe 0)
                mmove2 <- adversaryPlays st pos2
                case mmove2 of
                    Nothing -> pure $ Done {moves: moves `Array.snoc` {pos, move, firstPlayer: true}, win: true}
                    Just move2 -> 
                        let pos3 = pos2 - (st.config.possibleMoves !! move2 # fromMaybe (-1)) in
                        pure $ Loop {moves: moves <> [{firstPlayer: true, pos, move}, {firstPlayer: false, pos: pos2, move: move2}]
                                    , pos: pos3
                                    }

adjustBalls :: RootState -> { moves :: Array {firstPlayer :: Boolean, pos :: Int, move :: Int} , win :: Boolean } -> RootState
adjustBalls st {moves, win} = 
    let nbBalls = moves # Array.foldl 
                            (\acc {firstPlayer, pos, move} ->
                                acc # ix (pos-1) <<< ix move %~ \x ->
                                    max 0 (x + 
                                        (if not firstPlayer && st.config.adversary /= Machine then
                                            0
                                        else if win == firstPlayer then
                                            st.config.reward
                                        else
                                            st.config.penalty
                                        ))
                            ) st.nbBalls
                        <#> (\balls -> if Array.all (_ == 0) balls then 
                                            Array.replicate (Array.length balls) st.config.ballsPerColor
                                        else
                                            balls
                            )
    in st { nbBalls = nbBalls
          , nbVictories = st.nbVictories + (if win then 1 else 0) 
          , nbLosses = st.nbLosses + (if win then 0 else 1)
          }         

nextGame :: RootState -> Effect RootState
nextGame st = runGame st <#> adjustBalls st

initMachine :: RootState -> RootState
initMachine st =
    st { nbBalls = repeat st.config.nbPigeonholes \i ->
                        Array.replicate
                            (Array.length $ st.config.possibleMoves # Array.filter \j -> i + 1 - j >= 0)
                            st.config.ballsPerColor
       , nbVictories = 0
       , nbLosses = 0
       }

state :: RootState
state = 
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
        ,   nbPigeonholes: "8"
        ,   ballsPerColor: "6"
        ,   reward: "3"
        ,   penalty: "-1"
        ,   machineStarts: "y"
        }
    ,   nbVictories: 0
    ,   nbLosses: 0
    ,   nbBalls: []
    ,   losingPositions: losingPositions 9 [1, 2]
    } # initMachine