import { RecipeType } from "../../Recipe/types";
import { RatingType } from "../types";
import UserRating from "./UserRating";
import LastRatings from "./LastRatings";
import RecipeAverageRating from "./RecipeAverageRating";
import { Card } from "../../../components/ui";

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-primary-600"
          >
            <path d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" />
          </svg>
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
