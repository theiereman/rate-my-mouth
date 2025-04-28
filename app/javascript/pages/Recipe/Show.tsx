import { Head } from "@inertiajs/react";
import { RecipeType } from "./types";
import Comments from "../Comments/Comments";
import { RatingType } from "../Ratings/types";
import Recipe from "./components/Recipe";
import { CommentableType } from "../Comments/types";
import CommentForm from "../Comments/CommentForm";
import RecipeRatingDetails from "../Ratings/components/RecipeRatingDetails";

interface ShowProps {
  recipe: RecipeType;
  userRating: RatingType;
}

export default function Show({ recipe, userRating }: ShowProps) {
  return (
    <>
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <div className="mx-auto flex flex-col gap-6">
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <Recipe recipe={recipe} />
          <RecipeRatingDetails recipe={recipe} userRating={userRating} />
        </div>
        <div className="flex flex-col gap-2">
          <CommentForm
            commentableId={recipe.id}
            commentableType={CommentableType.recipe}
          />
          <Comments comments={recipe.comments} />
        </div>
      </div>
    </>
  );
}
