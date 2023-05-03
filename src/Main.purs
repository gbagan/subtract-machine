module Main (main) where

import Prelude

import Control.Monad.Reader.Trans (runReaderT)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Ref as Ref
import Pha.App (app)
import Pha.Update (hoist)
import Random.LCG (randomSeed)
import SM.View (view)
import SM.Model (init)
import SM.Update (update)

main ∷ Effect Unit
main = do
  newSeed <- randomSeed
  genModel <- Ref.new {newSeed, size: 0}
  app
    { init: { model: init, msg: Nothing }
    , view
    , update: hoist (flip runReaderT {genModel}) <<< update
    , selector: "#root"
    }
