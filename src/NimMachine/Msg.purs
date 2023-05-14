module NimMachine.Msg where

data Msg
  = NextGame
  | RunMachine
  | StopMachine
  | SetGraphType String
  | SetNbBoxes String
  | TogglePossibleMove Int
  | SetKingWidth String
  | SetKingHeight String
  | SetAdversary String
  | SetReward String
  | SetPenalty String
  | SetBallsPerColor String
  | SetMachineStarts String
  | ColorChange Int String
  | SetFastMode Boolean