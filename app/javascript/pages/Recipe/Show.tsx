import { Head } from "@inertiajs/react";
import { RecipeType } from "./types";
import Comments from "../Comments/Comments";
import { CommentableType } from "../Comments/types";
import RecipeRating from "../Ratings/RecipeRating";
import { RatingType } from "../Ratings/types";
import Rating from "@mui/material/Rating";
import CommentForm from "../Comments/CommentForm";

interface ShowProps {
  recipe: RecipeType;
  userRating: RatingType;
}

export default function Show({ recipe, userRating }: ShowProps) {
  return (
    <>
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <div className="mx-auto flex flex-col gap-6">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="font-bold text-4xl">{recipe.name}</h1>
            <Rating value={recipe.average_rating} readOnly precision={0.5} />
          </div>
          <h2 className="italic">de {recipe.user.username}</h2>
        </div>
        <h2>Ingredients :</h2>
        <h2>Instructions :</h2>
        <div className="border border-gray-400 rounded-xl p-2">
          <h1 className="font-bold mb-2">
            Donner mon avis alors que personne ne l'a demandé :
          </h1>
          <RecipeRating recipeId={recipe.id} rating={userRating} />
          <CommentForm
            commentableId={recipe.id}
            commentableType={CommentableType.recipe}
          />
        </div>

        <Comments comments={recipe.comments} />
      </div>
    </>
  );
}
