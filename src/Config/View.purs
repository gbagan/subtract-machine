module SM.Config.View where
import Prelude
import Data.Maybe (Maybe(..))
import Data.Array (mapWithIndex)
import SM.Msg (Msg(..))
import SM.Model (RawConfig)
import Pha.Html (Html)
import Pha.Html as H
import Pha.Html.Attributes as P
import Pha.Html.Events as E

view ∷ RawConfig -> Html Msg
view {possibleMoves, adversary, nbPigeonholes, ballsPerColor, reward, penalty, machineStarts} =
    H.elem "sl-card" []
    [   H.div [H.attr "slot" "header"] [H.text "Choix des paramètres"]
    ,   H.div [H.class_ "config-main"] 
        [   H.div [] [H.text "Coups possibles"]
        ,   H.div [] $
            possibleMoves # mapWithIndex \i checked ->
                H.elem "sl-checkbox" [ P.checked checked
                                     , E.on "sl-change" \ev -> pure $ Just (SetPossibleMove i ev)
                                     ]
                [   H.text $ show (i+1)
                ]
        ,   H.div [] [H.text "Adversaire"]
        ,   H.elem "sl-select" [P.value adversary]
            [   H.elem "sl-menu-item" [P.value "random"] [H.text "Aléatoire"]
            ,   H.elem "sl-menu-item" [P.value "expert"] [H.text "Expert"]
            ,   H.elem "sl-menu-item" [P.value "machine"] [H.text "Machine"]
            ]
        ,   H.div [] [H.text "Nombre de casiers"]
        ,   H.elem "sl-range" [ H.attr "min" "8"
                              , H.attr "max" "16"
                              , P.value nbPigeonholes
                              , E.on "sl-change" \ev -> pure $ Just (SetNbPigeonholes ev)
                              ]
                              []
        ,   H.div [] [H.text "Billes par couleur"]
        ,   H.elem "sl-range" [ H.attr "min" "2"
                              , H.attr "max" "10"
                              , P.value ballsPerColor
                              , E.on "sl-change" \ev -> pure $ Just (SetBallsPerColor ev)
                              ] []
        ,   H.div [] [H.text "Récompense"]
        ,   H.elem "sl-input" [P.type_ "number", H.attr "min" "1", P.value reward] [] 
        ,   H.div [] [H.text "Pénalité"]
        ,   H.elem "sl-input" [P.type_ "number", H.attr "max" "0", P.value penalty] []
        ,   H.div [] [H.text "La machine commence"]
        ,   H.elem "sl-radio-group" []
            [   H.elem "sl-radio" [P.value "y", P.checked true] [H.text "Oui"]
            ,   H.elem "sl-radio" [P.value "n"] [H.text "Non"]
            ]
        ,   H.elem "sl-button" [E.onClick \_ -> InitMachine] [H.text "Préparer la machine"]
        ,   H.elem "sl-button" [E.onClick \_ -> RunMachine] [H.text "Lancer la machine"]
        ,   H.elem "sl-button" [E.onClick \_ -> NextGame] [H.text "Avancer d'une partie"]
        ]
        
    ]