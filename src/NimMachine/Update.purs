module NimMachine.Update (update) where

import Relude

import Control.Monad.Gen.Trans (GenState, runGen)
import Data.Int as Int
import Effect.Ref (Ref)
import Effect.Ref as Ref
import Pha.Update (Update, Milliseconds(..), delay)
import NimMachine.Model
  ( Config
  , Model
  , GraphType(..)
  , initMachine
  , nextGame
  , adversaryFromString
  , updatePossibleMoves
  )
import NimMachine.Msg (Msg(..))
import Type.Proxy (Proxy(..))

type Env = { genState ∷ Ref GenState }

type Update' model msg a = Update model msg (ReaderT Env Aff) a

evalGen ∷ ∀ model msg a. Gen a → Update' model msg a
evalGen g = do
  { genState } ← ask
  st ← liftEffect $ Ref.read genState
  let v /\ st' = runGen g st
  liftEffect $ Ref.write st' genState
  pure v

-- lenses
_config ∷ Lens' Model Config
_config = prop (Proxy ∷ _ "config")

_graphType ∷ Lens' Config GraphType
_graphType = prop (Proxy ∷ _ "graphType")

_colors ∷ Lens' Model (Array String)
_colors = prop (Proxy ∷ _ "colors")

changeConfig ∷ (Config → Config) → Update' Model Msg Unit
changeConfig f = modify_ $ initMachine <<< (_config %~ f)

update ∷ Msg → Update' Model Msg Unit
update RunMachine = do
  modify_ _ { isRunning = true }
  go
  where
  go = do
    st ← get
    when st.isRunning do
      update NextGame
      delay (Milliseconds $ if st.fastMode then 100.0 else 500.0)
      go

update StopMachine = modify_ _ { isRunning = false }

update NextGame = do
  st ← get
  put =<< evalGen (nextGame st)

update (SetGraphType val) = changeConfig _
  { graphType = if val == "nim" then Nim 8 [ 1, 2 ] else King 3 3
  }

update (SetNbBoxes n) = changeConfig $ _graphType %~
  case _ of
    Nim _ moves → Nim (Int.fromString n ?: 8) moves
    x → x

update (TogglePossibleMove i) = changeConfig $ _graphType %~
  case _ of
    Nim n moves → Nim n (updatePossibleMoves i moves)
    x → x

update (SetKingWidth n) = changeConfig $ _graphType %~
  case _ of
    King _ h → King (Int.fromString n ?: 3) h
    x → x

update (SetKingHeight m) = changeConfig $ _graphType %~
  case _ of
    King w _ → King w (Int.fromString m ?: 3)
    x → x

update (SetReward n) = changeConfig _ { reward = Int.fromString n ?: 3 }

update (SetPenalty n) = changeConfig _ { penalty = Int.fromString n ?: (-1) }

update (SetAdversary val) = changeConfig _ { adversary = adversaryFromString val }

update (SetBallsPerColor n) = changeConfig _ { ballsPerColor = Int.fromString n ?: 6 }

update (SetMachineStarts val) = changeConfig _ { machineStarts = val == "y" }

update (ColorChange i val) = _colors <<< ix i .= val

update (SetFastMode b) = modify_ _ { fastMode = b }
