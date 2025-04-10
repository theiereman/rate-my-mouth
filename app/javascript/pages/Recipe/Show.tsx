import { Head } from "@inertiajs/react";
import { RecipeType } from "./types";
import Comments from "../Comments/Comments";
import { CommentableType } from "../Comments/types";

interface ShowProps {
  recipe: RecipeType;
}

export default function Show({ recipe }: ShowProps) {
  return (
    <>
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <div className="mx-auto">
        <h1 className="font-bold text-4xl">{recipe.name}</h1>
        <h2 className="italic">de {recipe.user.username}</h2>

        <h2>Ingredients :</h2>

        <h2>Instructions :</h2>

        <Comments
          comments={recipe.comments}
          commentableId={recipe.id}
          commentableType={CommentableType.recipe}
        />
      </div>
    </>
  );
}
