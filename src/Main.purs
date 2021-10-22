module Main (main) where

import Prelude

import Data.Maybe (Maybe(..))
import Effect (Effect)
import Pha.App (app)
import Pha.Html (Html)
import Pha.Html as H
import SM.Config.View (view) as Config
import SM.Machine.View (view, drawScore) as Machine
import SM.Model (RootState, state)
import SM.Msg (Msg)
import SM.Update (update)

view ∷ RootState -> Html Msg
view state =
    H.div [H.class_ "sm-main"]
    [   H.div [H.class_ "sm-main-machine"]
        [   Machine.view state.nbBalls
        ,   Machine.drawScore state.nbVictories state.nbLosses
        ]
    ,   Config.view state.rawConfig
    ]

main ∷ Effect Unit
main = app
    {   init: {state, action: Nothing}
    ,   view
    ,   update
    ,   subscriptions: []
    ,   selector: "#root"
    }