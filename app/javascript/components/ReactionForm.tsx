import CommentForm from "../pages/Comments/CommentForm";
import { CommentableType } from "../pages/Comments/types";
import RecipeRating from "../pages/Ratings/components/UserRating";
import { RatingType } from "../pages/Ratings/types";
import { RecipeType } from "../pages/Recipe/types";

export default function ReactionForm({
  recipe,
  userRating,
}: {
  recipe: RecipeType;
  userRating: RatingType;
}) {
  return (
    <div>
      <h1 className="font-bold mb-2">
        Donner mon avis alors que personne ne l'a demandé :
      </h1>
      <RecipeRating recipeId={recipe.id} rating={userRating} />
      <CommentForm
        commentableId={recipe.id}
        commentableType={CommentableType.recipe}
      />
    </div>
  );
}
