import { RecipeType } from "@customTypes/recipe.types";
import { useState } from "react";

export function useIngredientQuantifier({ recipe }: { recipe: RecipeType }) {
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

  return {
    handleIncrease,
    handleDecrease,
    updatedIngredients,
    numberOfServings,
  };
}
