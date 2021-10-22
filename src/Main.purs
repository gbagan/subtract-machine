module Main (main) where

import Prelude
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Pha.App (app)
import SM.View (view)
import SM.Model (state)
import SM.Update (update)

main ∷ Effect Unit
main = app
    {   init: {state, action: Nothing}
    ,   view
    ,   update
    ,   subscriptions: []
    ,   selector: "#root"
    }