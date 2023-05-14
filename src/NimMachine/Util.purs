module NimMachine.Util where

import Control.Monad.Gen.Trans (Gen, chooseInt)
import Prelude
import Data.Array ((!!), length, mapWithIndex, sortBy, zipWith)
import Data.Int as Int
import Data.Maybe (Maybe(..))
import Data.Number (floor, sin)
import Data.Tuple (fst, snd)
import Data.Tuple.Nested ((/\))

map2 ∷ ∀a b c. Array a → Array b → (a → b → c) → Array c
map2 t1 t2 fn = zipWith ($) (map fn t1) t2

randomPick ∷ ∀a. Array a → Gen (Maybe a)
randomPick [] = pure Nothing
randomPick t  = (t !! _) <$> chooseInt 0 (length t - 1)

pseudoRandom ∷ Int → Number
pseudoRandom n = m - floor m
  where
  m = 100.0 * sin (Int.toNumber (n + 1))

pseudoShuffle ∷ forall a. Array a → Array a
pseudoShuffle =
  mapWithIndex (\i x → pseudoRandom i /\ x)
  >>> sortBy (comparing fst)
  >>> map snd
