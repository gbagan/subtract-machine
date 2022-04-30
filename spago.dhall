{ name = "purescript"
, dependencies =
  [ "arrays"
  , "datetime"
  , "effect"
  , "integers"
  , "lazy"
  , "maybe"
  , "numbers"
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
