let upstream =
      https://github.com/purescript/package-sets/releases/download/psc-0.15.8-20230517/packages.dhall
        sha256:8b94a0cd7f86589a6bd06d48cb9a61d69b66a94b668657b2f10c8b14c16e028c

let overrides = {=}

let additions =
      { pha =
        { dependencies =
          [ "aff"
          , "effect"
          , "free"
          , "prelude"
          , "unsafe-reference"
          , "web-uievents"
          , "web-pointerevents"
          ]
        , repo = "https://github.com/gbagan/purescript-pha.git"
        , version = "master"
        }
      , relude =
        { dependencies =
          [ "aff"
          , "arrays"
          , "control"
          , "effect"
          , "either"
          , "foldable-traversable"
          , "generate-values"
          , "integers"
          , "lazy"
          , "lists"
          , "maybe"
          , "numbers"
          , "ordered-collections"
          , "prelude"
          , "profunctor-lenses"
          , "transformers"
          , "tuples"
          , "unfoldable"
          ]
        , repo = "https://github.com/gbagan/purescript-relude.git"
        , version = "master"
        }
      }

in  upstream // overrides // additions
