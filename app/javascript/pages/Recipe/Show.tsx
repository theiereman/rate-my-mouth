import { Head } from "@inertiajs/react";
import { RecipeType } from "./types";
import Comments from "../Comments/Comments";
import { RatingType } from "../Ratings/types";
import Recipe from "./components/Recipe";
import { CommentableType } from "../Comments/types";
import RecipeRatingDetails from "../Ratings/components/RecipeRatingDetails";
import { LinkButton } from "../../components/ui";

interface ShowProps {
  recipe: RecipeType;
  userRating: RatingType;
}

export default function Show({ recipe, userRating }: ShowProps) {
  console.log(recipe);

  return (
    <>
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LinkButton
            href="/recipes"
            variant="ghost"
            size="sm"
            icon={<span className="material-symbols-outlined">arrow_back</span>}
          >
            Retour aux recettes
          </LinkButton>
        </div>
      </div>

      <div className="mx-auto flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          <Recipe recipe={recipe} showRating={true} />
          <RecipeRatingDetails recipe={recipe} userRating={userRating} />
        </div>

        <Comments
          comments={recipe.comments}
          commentableId={recipe.id}
          commentableType={CommentableType.recipe}
        />
      </div>
    </>
  );
}
