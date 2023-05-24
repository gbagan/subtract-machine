{ name = "purescript"
, dependencies =
  [ "generate-values"
  , "integers"
  , "lcg"
  , "numbers"
  , "ordered-collections"
  , "pha"
  , "prelude"
  , "refs"
  , "relude"
  , "transformers"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
