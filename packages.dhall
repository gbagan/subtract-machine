let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.0-20220515/packages.dhall
        sha256:6d7cde12a37db772a5fb78a1d8877481445abfd3351d57605e2ceb5e66892022

let overrides = {=}

let additions =
      { pha =
        { dependencies =
          [ "aff"
          , "effect"
          , "free"
          , "web-uievents"
          , "unsafe-reference"
          , "web-pointerevents"
          ]
        , repo = "https://github.com/gbagan/purescript-pha.git"
        , version = "master"
        }
      }

in  upstream // overrides // additions
