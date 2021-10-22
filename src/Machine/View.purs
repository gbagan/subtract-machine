module SM.Machine.View where
import Prelude
import Data.Maybe (fromMaybe)
import Data.Array as Array
import Data.Array ((!!))
import Pha.Html (Html)
import Pha.Html as H
import Pha.Html.Attributes as P
import Data.Int as Int
import Math as Math

map2 ∷ ∀a b c. Array a → Array b → (Int → a → b → c) → Array c
map2 t1 t2 fn = Array.zipWith ($) (Array.mapWithIndex fn t1) t2

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
                    height = min 140 (Array.length allBalls) in
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

view ∷ forall a. Array (Array Int) -> Html a
view nbBalls =
    H.elem "sl-card" []
    [   H.div [H.attr "slot" "header"] [H.text "Visualisation de la machine"]
    ,   H.div [H.class_ "sm-machine-main"] $
            nbBalls # Array.mapWithIndex drawPigeonhole
    ]


drawScore :: forall a. Int -> Int -> Html a
drawScore nbVictories nbLosses =
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
