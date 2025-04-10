import { Link, router } from "@inertiajs/react";
import { formatDate } from "../../helpers/dateHelper";
import { RecipeType } from "./types";

interface RecipeProps {
  recipe: RecipeType;
}

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <Link
      className="flex bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200"
      href={`/recipes/${recipe.id}`}
    >
      <div className="flex-1">
        <div className="flex flex-col mb-4">
          <p>{recipe.name}</p>
          <p className="text-sm italic">par {recipe.user.username}</p>
        </div>
        {
          <p className="text-xs">
            {recipe.comments.length} commentaire
            {recipe.comments.length > 1 ? "s" : ""}
          </p>
        }
      </div>
      <div className="flex flex-col text-right text-sm">
        <p>Créé le : {formatDate(recipe.created_at)}</p>
        <p>Mis à jour le : {formatDate(recipe.created_at)}</p>
      </div>
    </Link>
  );
}
