module SM.Update where

import Prelude
import Control.Monad.Rec.Class (tailRecM, Step(..))
import Data.Lens (Lens', (.=), (%=))
import Data.Lens.Index (ix)
import Data.Lens.Record (prop)
import Data.Maybe (Maybe(..))
import Data.Time.Duration (Milliseconds(..))
import Effect.Class (liftEffect)
import Pha.Update (Update, get, modify_, put, delay)
import SM.Model (RawConfig, State, Status(..), initMachine, rawConfigToConfig, nextGame)
import SM.Msg (Msg(..))
import Type.Proxy (Proxy(..))

_rawConfig ∷ Lens' State RawConfig
_rawConfig = prop (Proxy ∷ _ "rawConfig")
_possibleMoves ∷ Lens' RawConfig (Array Boolean)
_possibleMoves = prop (Proxy ∷ _ "possibleMoves")

update ∷ Msg → Update State Unit
update InitMachine =
    modify_ \st →
        case rawConfigToConfig st.rawConfig of
            Nothing → st
            Just config → initMachine st{config = config}

update RunMachine = do
    modify_ _{status = Running}
    tailRecM go unit
    where
    go _ = do
        st <- get
        if st.status /= Running then do
            put st{status = Stopped}
            pure $ Done unit
        else do
            update NextGame
            delay (Milliseconds 500.0)
            pure $ Loop unit

update StopMachine = modify_ _{status = IsStopping}

update NextGame = do
    st <- get
    put =<< liftEffect (nextGame st)

update (SetReward n) = _rawConfig %= _{reward = n}
update (SetPenalty n) = _rawConfig %= _{penalty = n}
update (SetPossibleMove i b) = _rawConfig <<< _possibleMoves <<< ix i .= b
update (SetAdversary val) = _rawConfig %= _{adversary = val}
update (SetNbPigeonholes n) = _rawConfig %= _{nbPigeonholes = n}
update (SetBallsPerColor n) = _rawConfig %= _{ballsPerColor = n}
update (SetMachineStarts val) = _rawConfig %= _{machineStarts = val == "y"}
