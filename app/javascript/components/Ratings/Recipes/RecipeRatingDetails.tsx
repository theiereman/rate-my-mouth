import { RecipeType } from "../../../types/recipe.types";
import { RatingType } from "../../../types/rating.types";
import UserRating from "../Form/RatingForm";
import LastRatings from "../RatingList";
import RecipeAverageRating from "./RecipeRatingAverage";
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
