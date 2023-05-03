{ name = "purescript"
, dependencies =
  [ "aff"
  , "arrays"
  , "control"
  , "datetime"
  , "effect"
  , "generate-values"
  , "integers"
  , "lazy"
  , "lcg"
  , "maybe"
  , "numbers"
  , "ordered-collections"
  , "pha"
  , "prelude"
  , "profunctor-lenses"
  , "refs"
  , "tailrec"
  , "transformers"
  , "tuples"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
