module SM.View where
import Prelude
import Data.Maybe (Maybe(..), fromMaybe)
import Data.Array as Array
import Data.Array ((!!))
import Data.Int as Int
import Math as Math
import Pha.Html (Html)
import Pha.Html as H
import Pha.Html.Attributes as P
import Pha.Html.Events as E
import SM.Util (map2)
import SM.Model (RawConfig, RootState)
import SM.Msg (Msg(..))

colors :: Array(String)
colors = ["yellow", "red", "cyan", "lightgreen", "magenta"]

pseudoRandom :: Int -> Number
pseudoRandom n = m - Math.floor m where
                 m = 100.0 * Math.sin (Int.toNumber (n+1))

drawPigeonhole ∷ forall a. Int -> Array Int -> Html a
drawPigeonhole i nbBalls =
    H.div [H.class_ "sm-pigeonhole"]
    [   H.svg [P.viewBox 0 0 100 150, H.class_ "sm-pigeonhole-svg"]
        [   H.path [P.d "M1 1 L10 149 L90 149 L99 1", P.strokeWidth 3.0, P.stroke "#000", P.fill "transparent"]
        ,   H.g [] (
                let allBalls = Array.concat $ nbBalls # Array.mapWithIndex (flip Array.replicate)
                    height = min 135 (Array.length allBalls) in
                allBalls # Array.mapWithIndex \j color ->
                    H.circle [ P.cx $ 15.0 + pseudoRandom (i + j) * 71.0
                             , P.cy $ 140.0 - pseudoRandom (10 + i + j) * (Int.toNumber height)
                             , P.r 5.0
                             , P.fill $ fromMaybe "black" (colors !! color)
                            ]
            )
        ]
    ,   H.div [H.class_ "sm-pigeonhole-no"] [H.text $ show (i + 1)]
    ,   H.div [H.class_ "ball-counter-group"] $
        map2 nbBalls colors \_ n color ->
            H.div [H.class_ "ball-counter", H.style "background-color" color]
            [   H.text $ show n
            ]
    ]


scoreView :: forall a. Int -> Int -> Html a
scoreView nbVictories nbLosses =
    H.elem "sl-card" []
    [   H.div [H.attr "slot" "header"] [H.text "Score"]
    ,   H.div [H.class_ "sm-score"]
        [   H.span [H.class_ "sm-victory"] [H.text $ "Victoires: " <> show nbVictories]
        ,   H.elem "sl-progress-bar" 
                [ H.class_ "sm-score-progress"
                , P.value $ show $ let n = nbVictories + nbLosses in
                                    if n == 0 then 
                                        50.0
                                    else
                                        100.0 * Int.toNumber nbVictories / Int.toNumber n
                ] 
                []
        ,   H.span [H.class_ "sm-loss"] [H.text $ "Défaites: " <> show nbLosses]
        ]
    ]

machineView ∷ forall a. Array (Array Int) -> Html a
machineView nbBalls =
    H.elem "sl-card" []
    [   H.div [H.attr "slot" "header"] [H.text "Visualisation de la machine"]
    ,   H.div [H.class_ "sm-machine-main"] $
            nbBalls # Array.mapWithIndex drawPigeonhole
    ]


configView ∷ RawConfig -> Html Msg
configView {possibleMoves, adversary, nbPigeonholes, ballsPerColor, reward, penalty, machineStarts} =
    H.elem "sl-card" []
    [   H.div [H.attr "slot" "header"] [H.text "Choix des paramètres"]
    ,   H.div [H.class_ "config-main"] 
        [   H.div [] [H.text "Coups possibles"]
        ,   H.div [] $
            possibleMoves # Array.mapWithIndex \i checked ->
                H.elem "sl-checkbox" [ P.checked checked
                                     , E.on "sl-change" \ev -> pure $ Just (SetPossibleMove i ev)
                                     ]
                [   H.text $ show (i+1)
                ]
        ,   H.div [] [H.text "Adversaire"]
        ,   H.elem "sl-select"
                [ P.value adversary
                , E.on "sl-change" \ev -> pure $ Just (SetAdversary ev)
                ]
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

view ∷ RootState -> Html Msg
view state =
    H.div [H.class_ "sm-main"]
    [   H.div [H.class_ "sm-main-machine"]
        [   machineView state.nbBalls
        ,   scoreView state.nbVictories state.nbLosses
        ]
    ,   configView state.rawConfig
    ]
