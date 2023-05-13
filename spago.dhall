{ name = "purescript"
, dependencies =
  [ "aff"
  , "arrays"
  , "control"
  , "debug"
  , "effect"
  , "foldable-traversable"
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
