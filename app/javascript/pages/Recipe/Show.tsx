import { Head } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import { RatingType } from "@customTypes/rating.types";
import { CommentableType } from "@customTypes/comment.types";
import Timer from "@components/tools/Timer";
import RecipeNotes from "@components/Recipes/RecipeNotes";
import Section from "@components/ui/Pages/Section";
import CommentForm from "@components/Comments/Form/CommentForm";
import RatingForm from "@components/Ratings/Form/RatingForm";
import RecipeContentItemList from "@components/Recipes/RecipeContentItemList";
import IngredientsQuantitySelector from "@components/Recipes/Ingredients/IngredientsQuantitySelector";
import RecipeActionsButtons from "@components/Recipes/RecipeActionsButtons";
import RecipeHeader from "@components/Recipes/RecipeHeader";
import RecipeBadges from "@components/Recipes/RecipeBadges";
import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";
import { useIngredientQuantifier } from "@hooks/useIngredientQuantifier";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import Page from "@components/ui/Pages/Page";
import { TimerProvider } from "@contexts/TimerContext";
import RecipeRelatedItemList from "@components/Recipes/RecipeRelatedItemList";

interface ShowProps {
  recipe: RecipeType;
  userRating: RatingType;
}

export default function Show({ recipe, userRating }: ShowProps) {
  const { isCurrentUser } = useUserIsCurrentUser(recipe.user);

  const {
    handleIncrease,
    handleDecrease,
    numberOfServings,
    updatedIngredients,
  } = useIngredientQuantifier({ recipe });

  return (
    <TimerProvider>
      <Page>
        <Head title={recipe.name} />

        {recipe.thumbnail_url && (
          <RecipeThumbnail
            thumbnailUrl={recipe.thumbnail_url}
            className="mb-4"
          />
        )}

        <div className="flex flex-col justify-between gap-6">
          <RecipeHeader showDescription recipe={recipe} />
          <RecipeBadges recipe={recipe} />
          {isCurrentUser && <RecipeActionsButtons recipe={recipe} />}
        </div>

        <Section title="Ingredients" underlineStroke={1}>
          <IngredientsQuantitySelector
            numberOfServings={numberOfServings}
            onValueIncrease={handleIncrease}
            onValueDecrease={handleDecrease}
          />
          <RecipeContentItemList recipeItems={updatedIngredients} />
        </Section>

        <Section title="Instructions" underlineStroke={2}>
          <RecipeContentItemList recipeItems={recipe.instructions} ordered />
        </Section>

        <div className="flex flex-col gap-16 md:flex-row md:gap-12">
          <Section
            title="Minuteur"
            containerClassName="flex-2"
            underlineStroke={1}
          >
            <Timer />
          </Section>
          <Section title="Notes personnelles" containerClassName="flex-3">
            <RecipeNotes recipeId={recipe.id} />
          </Section>
        </div>

        <div className="flex flex-col gap-16 md:flex-row md:gap-12">
          <Section
            title={`Commentaires (${recipe.comments_count})`}
            containerClassName="flex-3"
          >
            <CommentForm
              commentableId={recipe.id}
              commentableType={CommentableType.recipe}
              className="md:h-10" //forcing height to match the rating form
            />
            <RecipeRelatedItemList recipe={recipe} relatedItemType="comments" />
          </Section>

          <Section
            title={`Évaluations (${recipe.ratings_count})`}
            containerClassName="flex-2"
            underlineStroke={4}
          >
            <RatingForm
              recipeId={recipe.id}
              rating={userRating}
              className="self-start md:self-stretch md:h-10" //forcing height to match the comment form
            />
            <RecipeRelatedItemList recipe={recipe} relatedItemType="ratings" />
          </Section>
        </div>
      </Page>
    </TimerProvider>
  );
}
