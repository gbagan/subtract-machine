module SM.Msg where
import Web.Event.Event (Event)

data Msg = 
      InitMachine
    | NextGame
    | RunMachine
    | SetAdversary Event
    | SetReward String
    | SetPenalty String
    | SetBallsPerColor Event
    | SetNbPigeonholes Event
    | SetPossibleMove Int Event
