module SM.Msg where

data Msg
  = NextGame
  | RunMachine
  | StopMachine
  | SetGraphType String
  | SetNbPigeonholes String
  | TogglePossibleMove Int
  | SetKingWidth String
  | SetKingHeight String
  | SetAdversary String
  | SetReward String
  | SetPenalty String
  | SetBallsPerColor String
  | SetMachineStarts String
