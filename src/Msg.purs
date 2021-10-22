module SM.Msg where
import Web.Event.Event (Event)

data Msg = 
          InitMachine
        | SetReward String
        | SetPenalty String
        | SetBallsPerColor Event
        | SetNbPigeonholes Event
        | SetPossibleMove Int Event
        | NextGame
        | RunMachine