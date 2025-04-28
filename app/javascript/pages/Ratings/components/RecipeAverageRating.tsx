import { Rating } from "@mui/material";
import { RecipeType } from "../../Recipe/types";

export default function RecipeAverageRating({
  recipe,
}: {
  recipe: RecipeType;
}) {
  return (
    <div>
      <h1 className="font-semibold">Note moyenne de la recette</h1>
      <div className="flex gap-1 items-center">
        <Rating
          className="MuiRating-alternativeIconFilled"
          value={recipe.average_rating}
          readOnly
          precision={0.5}
        />
        <span>({recipe.ratings.length})</span>
      </div>
    </div>
  );
}
