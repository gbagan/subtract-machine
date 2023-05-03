let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.8-20230503/packages.dhall
        sha256:b0ca02f2efb206465b499ee847f174212be0c8c2e031044b7bd192d5294f22cb

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
