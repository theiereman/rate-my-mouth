import { Head } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import { RatingType } from "@customTypes/rating.types";
import RecipeItem from "@components/Recipes/RecipeItem";
import { CommentableType } from "@customTypes/comment.types";
import RecipeRatingDetails from "@components/Ratings/Recipes/RecipeRatingDetails";
import CommentList from "@components/Comments/CommentList";
import Timer from "@components/tools/Timer";
import RecipeNotes from "@components/Recipes/RecipeNotes";
import Section from "@components/ui/Pages/Section";

interface ShowProps {
  recipe: RecipeType;
  userRating: RatingType;
}

export default function Show({ recipe, userRating }: ShowProps) {
  return (
    <main className="flex flex-col gap-12">
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <RecipeItem className="space-y-12!" recipe={recipe} />

      <Section title="Outils" underlineStroke={1} className="flex gap-6">
        <Timer className="flex-1!" />
        <RecipeNotes recipeId={recipe.id} className="flex-1!" />
      </Section>

      <RecipeRatingDetails recipe={recipe} userRating={userRating} />

      <CommentList
        comments={recipe.comments}
        commentableId={recipe.id}
        commentableType={CommentableType.recipe}
      />
    </main>
  );
}
