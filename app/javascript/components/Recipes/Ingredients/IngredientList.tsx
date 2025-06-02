import { useState } from "react";
import { RecipeType } from "@customTypes/recipe.types";
import QuantitySelector from "./QuantitySelector";
import { Badge } from "@components/ui";

export default function IngredientList({ recipe }: { recipe: RecipeType }) {
  const [numberOfServings, setNumberOfServings] = useState(
    recipe.number_of_servings
  );

  const handleIncrease = () => {
    setNumberOfServings((prev) => prev + 1);
  };
  const handleDecrease = () => {
    if (numberOfServings > 1) {
      setNumberOfServings((prev) => prev - 1);
    }
  };

  //extract every number inside ingredients and multiply them by the number of servings
  const updatedIngredients = recipe.ingredients?.map((ingredient) => {
    // Regex mise à jour pour exclure les nombres précédés directement par une lettre
    const regex = /(?<![a-zA-Z])(\d+(\.\d+)?)/g;
    const numbers = ingredient.name.match(regex);
    if (numbers) {
      const updatedName = ingredient.name.replace(regex, (match) => {
        const number = parseFloat(match);
        const updatedNumber =
          (number / recipe.number_of_servings) * numberOfServings;
        return updatedNumber % 1 === 0
          ? Math.round(updatedNumber).toString()
          : updatedNumber.toFixed(2).replace(/\.?0+$/, "");
      });
      return { ...ingredient, name: updatedName };
    }
    return ingredient;
  });

  // Grouper les ingrédients par catégorie
  const groupedIngredients = updatedIngredients?.reduce(
    (groups, ingredient) => {
      const category = ingredient.category || "Sans catégorie";
      if (!groups[category]) {
        groups[category] = [];
      }
      groups[category].push(ingredient);
      return groups;
    },
    {} as Record<string, typeof updatedIngredients>
  );

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <h2 className="font-semibold">
          Ingredients pour {numberOfServings}{" "}
          <QuantitySelector
            onValueIncrease={handleIncrease}
            onValueDecrease={handleDecrease}
          />{" "}
          personne
          {numberOfServings > 1 ? "s" : ""}
        </h2>
      </div>

      {groupedIngredients &&
        Object.entries(groupedIngredients).map(([category, ingredients]) => (
          <div key={category} className="mb-4">
            {category !== "Sans catégorie" && (
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" size="sm">
                  {category}
                </Badge>
              </div>
            )}
            <ul className="list-disc pl-5">
              {ingredients?.map((ingredient, index) => (
                <li key={ingredient.id || index}>{ingredient.name}</li>
              ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
