import { RecipeType } from "../../Recipe/types";
import { RatingType } from "../types";
import UserRating from "./UserRating";
import LastRatings from "./LastRatings";
import RecipeAverageRating from "./RecipeAverageRating";
import { Card } from "../../../components";

export default function RecipeRatingDetails({
  recipe,
  userRating,
}: {
  recipe: RecipeType;
  userRating: RatingType;
}) {
  return (
    <Card variant="outlined" className="h-fit">
      <Card.Header>
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-600">
            star
          </span>
          Évaluations
        </h2>
      </Card.Header>
      <Card.Body className="space-y-6">
        <UserRating recipeId={recipe.id} rating={userRating} />
        <div className="h-px bg-neutral-200"></div>
        <LastRatings count={5} ratings={recipe.ratings} />
      </Card.Body>
    </Card>
  );
}
