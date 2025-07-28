import { IngredientType, InstructionType } from "@customTypes/recipe.types";
import { EmptyPlaceholder } from "@components/ui";
import RecipeCategoryContainer from "./RecipeCategoryContainer";
import TextWithTimerLinks from "@components/ui/TextWithTimerLinks";

function RecipeContentItemList({
  recipeItems,
  ordered = false,
}: {
  recipeItems: IngredientType[] | InstructionType[];
  ordered?: boolean;
}) {
  const categorizedItems = recipeItems.reduce(
    (categories, item) => {
      const category = item.category || "";
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(item);
      return categories;
    },
    {} as Record<string, typeof recipeItems>,
  );

  return (
    <div className="space-y-4">
      {Object.entries(categorizedItems)
        .sort(([a], [b]) => a.localeCompare(b)) // empty category first
        .map(([category, item]) => (
          <RecipeCategoryContainer title={category}>
            <ol
              className={`space-y-1 ${ordered ? "list-decimal" : "list-disc"}`}
            >
              {item.map((i) => (
                <span key={i.id} className="flex items-center gap-2 pl-5">
                  <li>
                    <TextWithTimerLinks text={i.name} />
                  </li>
                </span>
              ))}
            </ol>
          </RecipeCategoryContainer>
        ))}
    </div>
  );
}

export function InstructionList({
  instructions,
}: {
  instructions: InstructionType[];
}) {
  return instructions.length > 0 ? (
    <RecipeContentItemList recipeItems={instructions} ordered={true} />
  ) : (
    <EmptyPlaceholder>Aucune instruction trouvée.</EmptyPlaceholder>
  );
}

export function IngredientList({
  ingredients,
}: {
  ingredients: IngredientType[];
}) {
  return ingredients.length > 0 ? (
    <RecipeContentItemList recipeItems={ingredients} />
  ) : (
    <EmptyPlaceholder>Aucun ingrédient trouvé.</EmptyPlaceholder>
  );
}
