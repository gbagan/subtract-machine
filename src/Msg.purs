module SM.Msg where

data Msg
  = InitMachine
  | NextGame
  | RunMachine
  | StopMachine
  | SetAdversary String
  | SetReward String
  | SetPenalty String
  | SetBallsPerColor String
  | SetNbPigeonholes String
  | TogglePossibleMove Int
  | SetMachineStarts String
