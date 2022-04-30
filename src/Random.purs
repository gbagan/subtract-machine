module SM.Random where
import Prelude
import Data.Array as Array
import Data.Array ((!!))
import Data.Maybe (Maybe(..))
import Effect (Effect)
import Effect.Random (randomInt)

class Monad m ⇐ Random m where
    int ∷ Int → Int → m Int

instance Random Effect where
    int = randomInt

pick ∷ ∀m a. Random m ⇒ Array a → m (Maybe a)
pick [] = pure Nothing
pick t  = (t !! _) <$> int 0 (Array.length t - 1)