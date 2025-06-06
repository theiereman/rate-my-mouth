import { RecipeType } from "@customTypes/recipe.types";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";
import RecipeHeader from "./RecipeHeader";
import RecipeActionsButtons from "./RecipeActionsButtons";
import Section from "@components/ui/Pages/Section";
import RecipeContentItemList from "./RecipeContentItemList";
import { useIngredientQuantifier } from "@hooks/useIngredientQuantifier";
import IngredientsQuantitySelector from "./Ingredients/IngredientsQuantitySelector";
import RecipeBadges from "./RecipeBadges";

export default function RecipeItem({
  recipe,
  className,
}: {
  recipe: RecipeType;
  className?: string;
}) {
  const { isCurrentUser } = useUserIsCurrentUser(recipe.user);

  const {
    handleIncrease,
    handleDecrease,
    numberOfServings,
    updatedIngredients,
  } = useIngredientQuantifier({ recipe });

  return (
    <div className={`space-y-12 ${className}`}>
      {recipe.thumbnail_url && (
        <RecipeThumbnail thumbnailUrl={recipe.thumbnail_url} className="mb-4" />
      )}

      <div className="flex flex-col justify-between gap-4">
        <RecipeHeader showDescription recipe={recipe} />
        <RecipeBadges recipe={recipe} />
      </div>

      {isCurrentUser && (
        <Section title="Actions">
          {<RecipeActionsButtons recipe={recipe} />}
        </Section>
      )}

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
    </div>
  );
}
