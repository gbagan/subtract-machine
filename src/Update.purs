module SM.Update where

import Prelude
import Control.Monad.Rec.Class (forever)
import Data.Lens (Lens', (.=), (%=))
import Data.Lens.Index (ix)
import Data.Lens.Record (prop)
import Data.Maybe (Maybe(..))
import Data.Time.Duration (Milliseconds(..))
import Effect (Effect)
import Effect.Class (liftEffect)
import Pha.Update (Update, get, modify_, put, delay)
import SM.Model (RawConfig, RootState, initMachine, rawConfigToConfig, nextGame)
import SM.Msg (Msg(..))
import Type.Proxy (Proxy(..))
import Web.Event.Event (Event)

_rawConfig :: Lens' RootState RawConfig
_rawConfig = prop (Proxy ∷ _ "rawConfig")
_possibleMoves :: Lens' RawConfig (Array Boolean)
_possibleMoves = prop (Proxy ∷ _ "possibleMoves")

foreign import slIntValue :: Event -> Effect Int
foreign import slStringValue :: Event -> Effect String
foreign import slChecked :: Event -> Effect Boolean

update :: Msg -> Update RootState Unit
update InitMachine =
    modify_ \st ->
        case rawConfigToConfig st.rawConfig of
            Nothing -> st
            Just config -> st { config = config } # initMachine

update RunMachine =
    forever do
        update NextGame
        delay (Milliseconds 500.0)

update NextGame = do
    st <- get
    st2 <- liftEffect $ nextGame st
    put st2

update (SetReward n) = _rawConfig %= _{reward = n}
update (SetPenalty n) = _rawConfig %= _{penalty = n}
update (SetPossibleMove i ev) = do
    b <- liftEffect $ slChecked ev
    _rawConfig <<< _possibleMoves <<< ix i .= b
update (SetAdversary ev) = do
    val <- liftEffect $ slStringValue ev
    _rawConfig %= _{adversary = val}
update (SetNbPigeonholes ev) = do
    n <- liftEffect $ slIntValue ev
    _rawConfig %= _{nbPigeonholes = show n}
update (SetBallsPerColor ev) = do
    n <- liftEffect $ slIntValue ev
    _rawConfig %= _{ballsPerColor = show n}
