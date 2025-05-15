import { RecipeType } from "@customTypes/recipe.types";
import { RatingType } from "@customTypes/rating.types";
import RatingForm from "@components/Ratings/Form/RatingForm";
import RatingList from "@components/Ratings/RatingList";
import { Card } from "@components/ui";

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
        <RatingForm recipeId={recipe.id} rating={userRating} />
        <div className="h-px bg-neutral-200"></div>
        <RatingList count={5} ratings={recipe.ratings} />
      </Card.Body>
    </Card>
  );
}
