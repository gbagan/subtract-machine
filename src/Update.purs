module SM.Update (update) where

import Prelude
import Control.Monad.Rec.Class (tailRecM, Step(..))
import Control.Monad.Gen.Trans (Gen, GenState, runGen)
import Control.Monad.Reader.Class (ask)
import Control.Monad.Reader.Trans (ReaderT)
import Data.Int as Int
import Data.Lens (Lens', (%~))
import Data.Lens.Record (prop)
import Data.Maybe (fromMaybe)
import Data.Time.Duration (Milliseconds(..))
import Data.Tuple.Nested ((/\))
import Effect.Class (liftEffect)
import Effect.Aff (Aff)
import Effect.Ref (Ref)
import Effect.Ref as Ref
import Pha.Update (Update, get, modify_, put, delay)
import SM.Model ( Config, Model, GraphType(..), Status(..)
                , initMachine, nextGame, adversaryFromString, updatePossibleMoves)
import SM.Msg (Msg(..))
import Type.Proxy (Proxy(..))

type Env = { genModel :: Ref GenState }

type Update' model msg a = Update model msg (ReaderT Env Aff) a

evalGen ∷ ∀model msg a. Gen a -> Update' model msg a
evalGen g = do
  {genModel} <- ask
  model <- liftEffect $ Ref.read genModel
  let v /\ model' = runGen g model
  liftEffect $ Ref.write model' genModel
  pure v


-- lenses
_config ∷ Lens' Model Config
_config = prop (Proxy ∷ _ "config")

_graphType ∷ Lens' Config GraphType
_graphType = prop (Proxy ∷ _ "graphType")

changeConfig :: (Config -> Config) -> Update' Model Msg Unit
changeConfig f = modify_ $ initMachine <<< (_config %~ f)

update ∷ Msg → Update' Model Msg Unit
update RunMachine = do
  modify_ _ { status = Running }
  tailRecM go unit
  where
  go _ = do
    st ← get
    if st.status /= Running then do
      put st { status = Stopped }
      pure $ Done unit
    else do
      update NextGame
      delay (Milliseconds 500.0)
      pure $ Loop unit

update StopMachine = modify_ _ { status = IsStopping }

update NextGame = do
  st ← get
  put =<< evalGen (nextGame st)

update (SetGraphType val) = changeConfig _{ graphType =
                              if val == "sub" then Substract 8 [1, 2] else King 3 3
                          }

update (SetNbPigeonholes n) = changeConfig $ _graphType %~
  case _ of
    Substract _ moves → Substract (fromMaybe 8 (Int.fromString n)) moves
    x → x

update (TogglePossibleMove i) = changeConfig $ _graphType %~
  case _ of
    Substract n moves → Substract n (updatePossibleMoves i moves)
    x → x

update (SetKingWidth n) = changeConfig $ _graphType %~
  case _ of
    King _ h → King (fromMaybe 3 (Int.fromString n)) h
    x → x

update (SetKingHeight m) = changeConfig$ _graphType %~
  case _ of
    King w _  → King w (fromMaybe 3 (Int.fromString m))
    x → x

update (SetReward n) = changeConfig _{ reward = fromMaybe 3 (Int.fromString n) }

update (SetPenalty n) = changeConfig _{ penalty = fromMaybe (-1) (Int.fromString n) }

update (SetAdversary val) = changeConfig _ { adversary = adversaryFromString val }

update (SetBallsPerColor n) = changeConfig _ { ballsPerColor = fromMaybe 6 (Int.fromString n) }

update (SetMachineStarts val) = changeConfig _ { machineStarts = val == "y" }
