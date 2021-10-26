module SM.Util where

import Prelude
import Data.Array ((..), (!!))
import Data.Array as Array
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Random (randomInt)

repeat ∷ ∀a. Int → (Int → a) → Array a
repeat 0 _ = []
repeat n f = f <$> 0 .. (n - 1)

randomPick :: ∀a. Array a → Effect (Maybe a)
randomPick [] = pure Nothing
randomPick t  = (t !! _) <$> randomInt 0 (Array.length t - 1)

map2 ∷ ∀a b c. Array a → Array b → (a → b → c) → Array c
map2 t1 t2 fn = Array.zipWith ($) (map fn t1) t2