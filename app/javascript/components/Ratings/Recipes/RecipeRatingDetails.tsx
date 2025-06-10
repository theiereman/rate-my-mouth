import { RecipeType } from "@customTypes/recipe.types";
import { RatingType } from "@customTypes/rating.types";
import RatingForm from "@components/Ratings/Form/RatingForm";
import RatingList from "@components/Ratings/RatingList";
import Section from "@components/ui/Pages/Section";

export default function RecipeRatingDetails({
  recipe,
  userRating,
}: {
  recipe: RecipeType;
  userRating: RatingType;
}) {
  return (
    <Section title="Évaluations" underlineStroke={2} className="space-y-4">
      <RatingForm recipeId={recipe.id} rating={userRating} />
      <RatingList count={5} ratings={recipe.ratings} />
    </Section>
  );
}
