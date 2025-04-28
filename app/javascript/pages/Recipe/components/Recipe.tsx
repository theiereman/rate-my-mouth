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
      <div id="ingredients" className="my-4">
        <h2 className="font-semibold">Ingredients :</h2>
        <ul className="list-disc pl-5">
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      <div id="instructions" className="my-4">
        <h2 className="font-semibold">Instructions :</h2>
        {recipe.instructions.map((instruction, index) => (
          <div key={index} className="flex gap-2">
            <span className="font-bold">{index + 1}.</span>
            <span>{instruction}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
