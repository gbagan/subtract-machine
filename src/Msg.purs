module SM.Msg where

data Msg = 
      InitMachine
    | NextGame
    | RunMachine
    | SetAdversary String
    | SetReward String
    | SetPenalty String
    | SetBallsPerColor Int
    | SetNbPigeonholes Int
    | SetPossibleMove Int Boolean
    | SetMachineStarts String
