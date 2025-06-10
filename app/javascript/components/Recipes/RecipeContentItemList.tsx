import { IngredientType, InstructionType } from "@customTypes/recipe.types";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import RecipeCategoryContainer from "./RecipeCategoryContainer";

function ItemListComponent({
  ordered,
  items,
}: {
  ordered: boolean;
  items: IngredientType[] | InstructionType[];
}) {
  return (
    <ol className={`space-y-1 ${ordered ? "list-decimal" : "list-disc"}`}>
      {items.map((item) => (
        <span key={item.id} className="flex items-center gap-2 pl-5">
          <li>{item.name}</li>
        </span>
      ))}
    </ol>
  );
}

export default function RecipeContentItemList({
  recipeItems,
  ordered = false,
}: {
  recipeItems: IngredientType[] | InstructionType[];
  ordered?: boolean;
}) {
  return (
    <>
      {recipeItems && recipeItems.length > 0 ? (
        (() => {
          const categorizedItems = recipeItems.reduce((categories, item) => {
            const category = item.category || "";
            if (!categories[category]) {
              categories[category] = [];
            }
            categories[category].push(item);
            return categories;
          }, {} as Record<string, typeof recipeItems>);

          return (
            <div className="space-y-4">
              {Object.entries(categorizedItems)
                .sort(([a], [b]) => a.localeCompare(b)) // empty category first
                .map(([category, item]) => (
                  <div className="flex flex-col items-start" key={category}>
                    <RecipeCategoryContainer title={category}>
                      <ItemListComponent ordered={ordered} items={item} />
                    </RecipeCategoryContainer>
                  </div>
                ))}
            </div>
          );
        })()
      ) : (
        <EmptyPlaceholder
          text={`Aucun élément n'a été ajouté à cette recette.`}
        />
      )}
    </>
  );
}
