import { IngredientType, InstructionType } from "@customTypes/recipe.types";
import { Badge } from "@components/ui";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";

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
                    {category !== "" && (
                      <h3 className="text-secondary-600">{category}</h3>
                    )}
                    <ol className={`${ordered ? "list-decimal" : "list-disc"}`}>
                      {item.map((item) => (
                        <span
                          key={item.id}
                          className="flex items-center gap-2 pl-5"
                        >
                          <li>{item.name}</li>
                        </span>
                      ))}
                    </ol>
                  </div>
                ))}
            </div>
          );
        })()
      ) : (
        <EmptyPlaceholder
          text={`Aucune ${recipeItems[0]} n'a été ajouté à cette recette.`}
        />
      )}
    </>
  );
}
