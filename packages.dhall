let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.8-20230511/packages.dhall
        sha256:47cfb0e7e14ee01dee00cb64bd0ca4a47ac44a64f3edf1e774251fb44cd73beb

let overrides = {=}

let additions =
      { pha =
        { dependencies =
          [ "aff"
          , "datetime"
          , "effect"
          , "free"
          , "web-uievents"
          , "unsafe-reference"
          , "tailrec"
          , "web-pointerevents"
          ]
        , repo = "https://github.com/gbagan/purescript-pha.git"
        , version = "master"
        }
      }

in  upstream // overrides // additions
