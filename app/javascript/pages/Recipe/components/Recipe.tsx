import { Rating } from "@mui/material";
import { RecipeType } from "../types";

export default function Recipe({
  recipe,
  showRating = false,
}: {
  recipe: RecipeType;
  showRating?: boolean;
}) {
  return (
    <div>
      <div>
        <div className="flex gap-2">
          <h1 className="font-bold text-4xl">{recipe.name}</h1>
          {showRating && (
            <Rating
              className="mt-2"
              value={recipe.average_rating}
              readOnly
              precision={0.5}
            />
          )}
        </div>
        <h2 className="italic">de {recipe.user.username}</h2>
      </div>
      <h2>Ingredients :</h2>
      <h2>Instructions :</h2>
    </div>
  );
}
