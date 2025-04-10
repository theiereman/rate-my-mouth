import { Head } from "@inertiajs/react";
import { RecipeType } from "./types";
import CommentForm from "../Comments/CommentForm";
import Comments from "../Comments/Comments";

interface ShowProps {
  recipe: RecipeType;
}

export default function Show({ recipe }: ShowProps) {
  return (
    <>
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <div className="mx-auto">
          <h1 className="font-bold text-4xl">{recipe.name}</h1>
          <h3 className="italic">de {recipe.user.username}</h3>
          <iframe src={recipe.url}></iframe>
          <Comments comments={recipe.comments} />
          <CommentForm recipeId={recipe.id} />
        </div>
      </div>
    </>
  );
}
