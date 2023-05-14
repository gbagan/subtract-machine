module NimMachine.Main (main) where

import Prelude

import Control.Monad.Reader.Trans (runReaderT)
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Ref as Ref
import Pha.App (app)
import Pha.Update (hoist)
import Random.LCG (randomSeed)
import NimMachine.View (view)
import NimMachine.Model (init)
import NimMachine.Update (update)

main ∷ Effect Unit
main = do
  newSeed ← randomSeed
  genState ← Ref.new {newSeed, size: 0}
  app
    { init: { model: init, msg: Nothing }
    , view
    , update: hoist (flip runReaderT {genState}) <<< update
    , selector: "#root"
    }
