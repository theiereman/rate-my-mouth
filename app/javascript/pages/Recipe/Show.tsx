import { Head } from "@inertiajs/react";
import { RawRecipe } from "@customTypes/recipe.types";
import { RatingType } from "@customTypes/rating.types";
import { CommentableType } from "@customTypes/comment.types";
import Timer from "@components/tools/Timer";
import RecipeNotes from "@components/Recipes/RecipeNotes";
import { Section } from "@components/ui";
import CommentForm from "@components/Comments/Form/CommentForm";
import RatingForm from "@components/Ratings/Form/RatingForm";
import {
  IngredientList,
  InstructionList,
} from "@components/Recipes/RecipeContentItemList";
import IngredientsQuantitySelector from "@components/Recipes/Ingredients/IngredientsQuantitySelector";
import RecipeActionsButtons from "@components/Recipes/RecipeActionsButtons";
import RecipeHeader from "@components/Recipes/RecipeHeader";
import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";
import { useIngredientQuantifier } from "@hooks/useIngredientQuantifier";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import Page from "@components/ui/Pages/Page";
import { TimerProvider } from "@contexts/TimerContext";
import RecipeRelatedItemList from "@components/Recipes/RecipeRelatedItemList";
import { RecipeAdapter } from "@adapters/recipe.adapter";
import { useMemo } from "react";

interface ShowProps {
  recipe: RawRecipe;
  userRating: RatingType;
}

export default function Show({ recipe: rawRecipe, userRating }: ShowProps) {
  //TODO: consider HOC to avoid having to adapt the recipes inside the component
  const recipe = useMemo(() => RecipeAdapter.fromApi(rawRecipe), [rawRecipe]);

  const { isCurrentUser } = useUserIsCurrentUser(recipe.user);

  const {
    handleIncrease,
    handleDecrease,
    handleResetToDefault,
    numberOfServings,
    updatedIngredients,
    isValueChanged,
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
          {isCurrentUser && <RecipeActionsButtons recipe={recipe} />}
        </div>

        <Section
          title="Ingredients"
          headerAction={
            <IngredientsQuantitySelector
              className="text-background!"
              numberOfServings={numberOfServings}
              onValueIncrease={handleIncrease}
              onValueDecrease={handleDecrease}
              onValueReset={handleResetToDefault}
              isValueChanged={isValueChanged}
            />
          }
        >
          <IngredientList ingredients={updatedIngredients} />
        </Section>

        <Section title="Instructions">
          <InstructionList instructions={recipe.instructions} />
        </Section>

        <div className="flex flex-col gap-8 md:flex-row">
          <Timer />
          <RecipeNotes recipeId={recipe.id} />
        </div>

        <div className="flex flex-col gap-8 md:flex-row">
          <Section
            className="flex-1"
            title={`Commentaires (${recipe.comments_count})`}
          >
            <CommentForm
              commentableId={recipe.id}
              commentableType={CommentableType.recipe}
              className="md:h-10" //forcing height to match the rating form
            />
            <RecipeRelatedItemList recipe={recipe} relatedItemType="comments" />
          </Section>

          <Section title={`Évaluations (${recipe.ratings_count})`}>
            <Section variant="ghost" title="Votre évaluation">
              <RatingForm
                recipeId={recipe.id}
                rating={userRating}
                className="self-start md:h-10 md:self-stretch" //forcing height to match the comment form
              />
            </Section>
            <div className="bg-primary-900 mt-4 h-1.5 w-full" />
            <RecipeRelatedItemList recipe={recipe} relatedItemType="ratings" />
          </Section>
        </div>
      </Page>
    </TimerProvider>
  );
}
