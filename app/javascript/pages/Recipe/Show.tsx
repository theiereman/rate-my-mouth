import { Head } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import { RatingType } from "@customTypes/rating.types";
import RecipeItem from "@components/Recipes/RecipeItem";
import { CommentableType } from "@customTypes/comment.types";
import CommentList from "@components/Comments/CommentList";
import Timer from "@components/tools/Timer";
import RecipeNotes from "@components/Recipes/RecipeNotes";
import Section from "@components/ui/Pages/Section";
import CommentForm from "@components/Comments/Form/CommentForm";
import RatingForm from "@components/Ratings/Form/RatingForm";
import RatingList from "@components/Ratings/RatingList";

interface ShowProps {
  recipe: RecipeType;
  userRating: RatingType;
}

export default function Show({ recipe, userRating }: ShowProps) {
  return (
    <main className="flex flex-col gap-12">
      <Head title={`${recipe.name} de ${recipe.user.username}`} />

      <RecipeItem className="space-y-12!" recipe={recipe} />

      <div className="flex flex-col md:flex-row gap-12">
        <Section
          title="Minuteur"
          containerClassName="flex-2"
          underlineStroke={1}
        >
          <Timer />
        </Section>
        <Section title="Notes personnelles" containerClassName="flex-3">
          <RecipeNotes recipeId={recipe.id} className="flex-1!" />
        </Section>
      </div>

      <div className="flex flex-col md:flex-row gap-12">
        <Section title="Commentaires" containerClassName="flex-3">
          <CommentForm
            commentableId={recipe.id}
            commentableType={CommentableType.recipe}
            className="md:h-10" //forcing height to match the rating form
          />
          <CommentList comments={recipe.comments} />
        </Section>

        <Section
          title="Évaluations"
          containerClassName="flex-2"
          underlineStroke={4}
        >
          <RatingForm
            recipeId={recipe.id}
            rating={userRating}
            className="self-center md:self-stretch md:h-10" //forcing height to match the comment form
          />
          <RatingList count={5} ratings={recipe.ratings} />
        </Section>
      </div>
    </main>
  );
}
