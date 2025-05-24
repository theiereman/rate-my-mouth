import { Head } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import { RatingType } from "@customTypes/rating.types";
import RecipeItem from "@components/Recipes/RecipeItem";
import { CommentableType } from "@customTypes/comment.types";
import RecipeRatingDetails from "@components/Ratings/Recipes/RecipeRatingDetails";
import CommentList from "@components/Comments/CommentList";
import Tools from "@components/tools/Tools";

interface ShowProps {
  recipe: RecipeType;
  userRating: RatingType;
}

export default function Show({ recipe, userRating }: ShowProps) {
  return (
    <main className="flex flex-col gap-4">
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <RecipeItem recipe={recipe} />

      <Tools recipeId={recipe.id} />

      <div className="flex flex-col lg:flex-row gap-4">
        <CommentList
          className="flex-2"
          comments={recipe.comments}
          commentableId={recipe.id}
          commentableType={CommentableType.recipe}
        />
        <RecipeRatingDetails
          className="flex-1"
          recipe={recipe}
          userRating={userRating}
        />
      </div>
    </main>
  );
}
