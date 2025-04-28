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
      <Rating
        className="MuiRating-alternativeIconFilled"
        value={recipe.average_rating}
        readOnly
        precision={0.5}
      />
    </div>
  );
}
