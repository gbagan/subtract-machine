module SM.Util where

import Prelude

import Data.Array ((..), (!!))
import Data.Array as Array
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Random (randomInt)

repeat ∷ ∀a. Int → (Int → a) → Array a
repeat 0 _ = []
repeat n f = 0 .. (n - 1) <#> f

randomPick :: ∀a. Array a → Effect (Maybe a)
randomPick t
    | Array.null t = pure Nothing
    | otherwise    = do
            i <- randomInt 0 (Array.length t - 1)
            pure $ t !! i