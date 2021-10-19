module Main (main) where

import Prelude
import Effect (Effect)
import Pha.App (app)
import Data.Maybe (Maybe(..))
import Pha.Update (Update)
import Pha.Html (Html)
import Pha.Html as H
import Pha.Html.Attributes as P

type State = {}

state ∷ State
state = {}

data Msg = NoAction

view ∷ State -> Html Msg
view _ =
    H.elem "sl-card" []
    [   H.div [H.attr "slot" "header"] [H.text "Choix des paramètres"]
    ,   H.div [H.class_ "config-main"] 
        [   H.div [] [H.text "Coups possibles"]
        ,   H.div []
            [   H.elem "sl-checkbox" [] [H.text "1"]
            ,   H.elem "sl-checkbox" [] [H.text "2"]
            ,   H.elem "sl-checkbox" [] [H.text "3"]
            ,   H.elem "sl-checkbox" [] [H.text "4"]
            ,   H.elem "sl-checkbox" [] [H.text "5"]
            ]
        ,   H.div [] [H.text "Adversaire"]
        ,   H.elem "sl-select" [P.value "2"]
            [   H.elem "sl-menu-item" [P.value "1"] [H.text "Aléatoire"]
            ,   H.elem "sl-menu-item" [P.value "2"] [H.text "Expert"]
            ,   H.elem "sl-menu-item" [P.value "3"] [H.text "Machine"]
            ]
        ,   H.div [] [H.text "Nombre de casiers"]
        ,   H.elem "sl-range" [H.attr "min" "8", H.attr "max" "16"] []
        ,   H.div [] [H.text "Billes par couleur"]
        ,   H.elem "sl-range" [H.attr "min" "2", H.attr "max" "10"] []
        ,   H.div [] [H.text "Récompense"]
        ,   H.elem "sl-input" [P.type_ "number", H.attr "min" "1", P.value "3"] []
        ,   H.div [] [H.text "Pénalité"]
        ,   H.elem "sl-input" [P.type_ "number", H.attr "max" "0", P.value "-1"] []
        ]
    ]

update ∷ Msg -> Update State Unit
update _ = pure unit


main ∷ Effect Unit
main = app
    {   init: {state, action: Nothing}
    ,   view
    ,   update
    ,   subscriptions: []
    ,   selector: "#root"
    }