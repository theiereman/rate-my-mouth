import { RecipeType } from "@customTypes/recipe.types";
import { useState } from "react";

export function useIngredientQuantifier({ recipe }: { recipe: RecipeType }) {
  const [numberOfServings, setNumberOfServings] = useState(
    recipe.number_of_servings,
  );

  const initialNumberOfServings = recipe.number_of_servings || 1;
  const isValueChanged = numberOfServings !== initialNumberOfServings;

  const handleIncrease = () => {
    setNumberOfServings((prev) => prev + 1);
  };
  const handleDecrease = () => {
    if (numberOfServings > 1) {
      setNumberOfServings((prev) => prev - 1);
    }
  };
  const handleResetToDefault = () => {
    setNumberOfServings(initialNumberOfServings);
  };

  const updatedIngredients = recipe.ingredients?.map((ingredient) => {
    const regex = /(?<![a-zA-Z])(\d+(?:[\.,]\d+)?)/g;
    const numbers = ingredient.name.match(regex);
    if (numbers) {
      const updatedName = ingredient.name.replace(regex, (match) => {
        const number = parseFloat(match.replace(",", "."));
        const updatedNumber =
          (number / recipe.number_of_servings) * numberOfServings;
        let result =
          updatedNumber % 1 === 0
            ? Math.round(updatedNumber).toString()
            : updatedNumber.toFixed(2).replace(/\.?0+$/, "");

        return result;
      });
      return { ...ingredient, name: updatedName };
    }
    return ingredient;
  });

  return {
    handleIncrease,
    handleDecrease,
    handleResetToDefault,
    updatedIngredients,
    numberOfServings,
    isValueChanged,
  };
}
