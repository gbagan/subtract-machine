module SM.View (view) where

import Prelude

import Data.Array ((!!), (..))
import Data.Array as Array
import Data.Int as Int
import Data.Map as Map
import Data.Maybe (fromMaybe, maybe)
import Data.Number (floor, sin)
import Data.Tuple (uncurry)
import Pha.Html (Html)
import Pha.Html as H
import Pha.Html.Attributes as P
import Pha.Html.Events as E
import Pha.Html.Util (pc, px, translate)
import SM.Graph (GraphDisplayer, GraphWithBalls, kingDisplayer, substractDisplayer)
import SM.Model (Config, Model, Status(..), GraphType(..), GameResult, adversaryToString)
import SM.Msg (Msg(..))

buttonClass :: String
buttonClass = "py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200"

checkboxClass :: String
checkboxClass = "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"

selectClass :: String
selectClass = "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"

inputNumberClass :: String
inputNumberClass = "block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"

colors ∷ Array String
colors = [ "yellow", "red", "cyan", "lightgreen", "magenta" ]

pseudoRandom ∷ Int → Number
pseudoRandom n = m - floor m
  where
  m = 100.0 * sin (Int.toNumber (n + 1))

drawPigeonhole ∷ forall a.
                  GraphDisplayer Int Int
                  → Int
                  → Array {edge :: Int, dest :: Int, nbBalls :: Int}
                  → Html a
drawPigeonhole displayer i balls =
  H.maybe (displayer.position i) \{x, y} →
    H.g [H.style "transform" $ translate (px x) (px y)]
        -- H.div []
      -- [ H.svg [ P.viewBox 0 0 100 150, H.class_ "block w-32 h-48" ]     
      [ H.path [ P.d "M1 1 L10 149 L90 149 L99 1", P.strokeWidth 3.0, P.stroke "#000", P.fill "transparent" ]
      , H.g []
          ( let
              allBalls = Array.concat 
                          $ balls 
                            <#>  \{nbBalls, edge} -> Array.replicate nbBalls edge
              height = min 135 (Array.length allBalls)
            in
              allBalls
                # Array.mapWithIndex \j color →
                    H.circle
                      [ P.cx $ 15.0 + pseudoRandom (i + j) * 71.0
                      , P.cy $ 140.0 - pseudoRandom (10 + i + j) * (Int.toNumber height)
                      , P.r 5.0
                      , P.fill $ fromMaybe "black" (colors !! color)
                      ]
          )
      ]
    {- , H.div [ H.class_ "block font-bold" ] [ H.text $ show (i + 1) ]
    --, H.div [ H.class_ "flex flex-row" ]
        $ balls <#> \{nbBalls, edge} →
            H.div [ H.class_ "h-6 w-8", H.style "background-color" (fromMaybe "black" $ colors !! edge) ]
              [ H.text $ show edge <> ":" <> show nbBalls
              ]
    ]
    -}

showResult ∷ forall a. GameResult → Array (Html a)
showResult { moves, win } =
  ( moves
      >>= \{ isMachineTurn, edge } →
          [ H.text $ (if isMachineTurn then "la machine" else "l'adversaire") <> " prend " <> show edge <> " jeton"
              <> (if edge > 1 then "s" else "")
          , H.br
          ]
  )
    <> [ H.text $ (if win then "la machine" else "l'adversaire") <> " gagne" ]

scoreView ∷ forall a. Int → Int → Html a
scoreView nbVictories nbLosses =
  H.div [ H.class_ "flex flex-row justify-between mt-4 mb-2" ]
    [ H.span [ H.class_ "text-blue-600 font-bold" ] [ H.text $ "Victoires: " <> show nbVictories ]
    , H.div [H.class_ "w-full bg-red-600 rounded-full h-6"]
        [ H.div
          [ H.class_ "h-6 bg-blue-600 rounded-l-full"
          , H.style "width" $ pc $
              let
                n = nbVictories + nbLosses
              in
                if n == 0 then
                  0.5
                else
                  Int.toNumber nbVictories / Int.toNumber n
          ] []
        ]
    , H.span [ H.class_ "text-red-600 font-bold" ] [ H.text $ "Défaites: " <> show nbLosses ]
    ]

machineView ∷ forall a. GraphDisplayer Int Int → GraphWithBalls Int Int → Html a
machineView displayer graphWithBalls =
  H.div [ H.class_ "w-[40vw]" ]
  -- [ H.class_ "grid grid-cols-8 gap-4" ]
    [ H.svg [P.viewBox 0 0 displayer.width displayer.height ]
      $ graphWithBalls
        # Map.toUnfoldable
        <#> uncurry (drawPigeonhole displayer)
    ]

configView ∷ Config → Status → Html Msg
configView conf status =
  H.div [ H.class_ "max-w rounded overflow-hidden shadow-lg p-4" ]
    [ H.div [ H.class_ "font-bold text-xl mb-2" ] [ H.text "Choix des paramètres" ]
    , H.div [ H.class_ "grid grid-cols-2 gap-4" ] $
        [ H.div [] [ H.text "type de jeu" ]
        , H.select
            [ H.class_ selectClass
            , P.value $ case conf.graphType of
                Substract _ _ -> "sub"
                King _ _ -> "king"
            , E.onValueChange SetGraphType
            ]
            [ H.option [ P.value "sub"] [H.text "Soustraction"]
            , H.option [ P.value "king" ] [H.text "Roi"]
            ]
        ] <>
          (case conf.graphType of
            Substract nbPigeonholes possibleMoves ->
              [ H.div [] [ H.text "Nombre de casiers" ]
              , H.select
                [ H.class_ selectClass
                , P.value $ show nbPigeonholes
                , E.onValueChange SetNbPigeonholes
                ] $ (8..16) <#> \i ->
                      H.option [ P.value (show i)] [H.text (show i)]
              , H.div [] [ H.text "Coups possibles" ]
              , H.div [ H.class_ "flex flex-row justify-between" ]
                $ (1 .. 5)
                  <#> \i →
                    H.label []
                      [ H.input
                        [ P.type_ "checkbox"
                        , P.checked (Array.elem i possibleMoves)
                        , H.class_ checkboxClass
                        , E.onChecked \_ -> TogglePossibleMove i
                        ]
                      , H.span [H.class_ "ml-2 text-sm font-medium text-gray-900"] [H.text $ show i]
                      ]
              ]
            King width height ->
              [ H.div [] [ H.text "Hauteur de la grille" ]
              , H.select
                [ H.class_ selectClass
                , P.value $ show height
                , E.onValueChange SetKingHeight
                ] $ (3..6) <#> \i ->
                      H.option [ P.value (show i)] [H.text (show i)]
              , H.div [] [ H.text "Largeur de la grille" ]
              , H.select
                [ H.class_ selectClass
                , P.value $ show width
                , E.onValueChange SetKingWidth
                ] $ (3..6) <#> \i ->
                      H.option [ P.value (show i)] [H.text (show i)]
              ]
          ) <>
        [ H.div [] [ H.text "Adversaire" ]
        , H.elem "select"
            [ H.class_ selectClass
            , P.value (adversaryToString conf.adversary)
            , E.onValueChange SetAdversary
            ]
            [ H.elem "option" [ P.value "random" ] [ H.text "Aléatoire" ]
            , H.elem "option" [ P.value "expert" ] [ H.text "Expert" ]
            , H.elem "option" [ P.value "machine" ] [ H.text "Machine" ]
            ]
        , H.div [] [ H.text "Billes par couleur" ]
        , H.input
            [ P.type_ "number"
            , H.class_ inputNumberClass
            , P.min 2
            , P.max 10
            , P.value $ show conf.ballsPerColor
            , E.onValueChange SetBallsPerColor
            ]
        , H.div [] [ H.text "Récompense" ]
        , H.input
            [ P.type_ "number"
            , H.class_ inputNumberClass
            , P.min 1
            , P.value (show conf.reward)
            , E.onValueChange SetReward
            ]
        , H.div [] [ H.text "Pénalité" ]
        , H.input
            [ P.type_ "number"
            , H.class_ inputNumberClass
            , P.max 0
            , P.value (show conf.penalty)
            , E.onValueChange SetPenalty
            ]
        , H.div [] [ H.text "La machine commence" ]
        , H.select
            [ H.class_ selectClass
            , P.value (if conf.machineStarts then "y" else "n")
            , E.onValueChange SetMachineStarts
            ]
            [ H.option [ P.value "y" ] [ H.text "Oui" ]
            , H.option [ P.value "n" ] [ H.text "Non" ]
            ]
        , if status == Stopped then
            H.button [ H.class_ buttonClass, E.onClick \_ → RunMachine ] [ H.text "Lancer la machine" ]
          else
            H.button [ H.class_ buttonClass, E.onClick \_ → StopMachine ] [ H.text "Arrêter la machine" ]
        , H.button [ H.class_ buttonClass, E.onClick \_ → NextGame ] [ H.text "Pas à pas" ]
        ]
    ]

view ∷ Model → Html Msg
view model =
  H.div [ H.class_ "flex flex-row" ]
    [ H.div [H.class_ "max-w rounded overflow-hidden shadow-lg p-4 mr-4"]
        [ H.div [ H.class_ "font-bold text-xl mb-2" ] [ H.text "Visualisation de la machine" ]
        , H.div [ H.class_ "flex flex-col" ]
            [ machineView displayer model.graphWithBalls
            , scoreView model.nbVictories model.nbLosses
            , H.div [] $ maybe [] showResult model.gameResult
            ]
        ]
    , configView model.config model.status
    ]
  where
  displayer = case model.config.graphType of
    Substract _ moves -> substractDisplayer moves
    King n m -> kingDisplayer n m
