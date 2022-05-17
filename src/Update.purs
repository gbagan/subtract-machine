module SM.Update (update) where

import Prelude
import Control.Monad.Rec.Class (tailRecM, Step(..))
import Data.Int as Int
import Data.Lens (Lens', (%=))
import Data.Lens.Record (prop)
import Data.Maybe (fromMaybe)
import Data.Time.Duration (Milliseconds(..))
import Effect.Class (liftEffect)
import Effect.Aff (Aff)
import Pha.Update (Update, get, modify_, put, delay)
import SM.Model (Config, State, Status(..), initMachine, nextGame, adversaryFromString, updatePossibleMoves)
import SM.Msg (Msg(..))
import Type.Proxy (Proxy(..))

-- lenses
_rawConfig ∷ Lens' State Config
_rawConfig = prop (Proxy ∷ _ "rawConfig")

_possibleMoves ∷ Lens' Config (Array Int)
_possibleMoves = prop (Proxy ∷ _ "possibleMoves")

update ∷ Msg → Update State Aff Unit
update InitMachine = modify_ \st → initMachine st { config = st.rawConfig }

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
  put =<< liftEffect (nextGame st)

update (SetReward n) = _rawConfig %= _ { reward = fromMaybe 3 (Int.fromString n) }

update (SetPenalty n) = _rawConfig %= _ { penalty = fromMaybe (-1) (Int.fromString n) }

update (SetPossibleMove i b) = _rawConfig <<< _possibleMoves %= updatePossibleMoves i b

update (SetAdversary val) = _rawConfig %= _ { adversary = adversaryFromString val }

update (SetNbPigeonholes n) = _rawConfig %= _ { nbPigeonholes = n }

update (SetBallsPerColor n) = _rawConfig %= _ { ballsPerColor = n }

update (SetMachineStarts val) = _rawConfig %= _ { machineStarts = val == "y" }
