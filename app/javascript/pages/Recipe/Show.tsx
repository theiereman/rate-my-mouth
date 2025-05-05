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
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
            }
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
