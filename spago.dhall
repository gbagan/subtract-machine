{ name = "purescript"
, dependencies =
  [ "arrays"
  , "generate-values"
  , "integers"
  , "lcg"
  , "numbers"
  , "ordered-collections"
  , "pha"
  , "prelude"
  , "refs"
  , "relude"
  , "tailrec"
  , "transformers"
  ]
, packages = ./packages.dhall
, sources = [ "src/**/*.purs" ]
}
