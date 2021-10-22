{ name = "purescript"
, dependencies =
  [ "arrays"
  , "datetime"
  , "debug"
  , "effect"
  , "integers"
  , "lazy"
  , "math"
  , "maybe"
  , "pha"
  , "prelude"
  , "profunctor-lenses"
  , "random"
  , "tailrec"
  , "web-events"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
