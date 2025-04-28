import { RecipeType } from "../../Recipe/types";
import { RatingType } from "../types";
import UserRating from "./UserRating";
import LastRatings from "./LastRatings";
import RecipeAverageRating from "./RecipeAverageRating";

export default function RecipeRatingDetails({
  recipe,
  userRating,
}: {
  recipe: RecipeType;
  userRating: RatingType;
}) {
  return (
    <div>
      <UserRating className="mb-4" recipeId={recipe.id} rating={userRating} />
      <RecipeAverageRating recipe={recipe} />
      <LastRatings ratings={recipe.ratings} />
    </div>
  );
}
