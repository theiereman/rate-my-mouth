import { useState } from "react";
import { RecipeType } from "../../types";

export default function Ingredients({ recipe }: { recipe: RecipeType }) {
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
  const updatedIngredients = recipe.ingredients.map((ingredient) => {
    const regex = /(\d+(\.\d+)?)/g;
    const numbers = ingredient.match(regex);
    if (numbers) {
      const updatedIngredient = ingredient.replace(regex, (match) => {
        const number = parseFloat(match);
        const updatedNumber =
          (number / recipe.number_of_servings) * numberOfServings;
        return updatedNumber % 1 === 0
          ? Math.round(updatedNumber).toString()
          : updatedNumber.toFixed(2).replace(/\.?0+$/, "");
      });
      return updatedIngredient;
    }
    return ingredient;
  });

  return (
    <div>
      <div className="flex gap-2">
        <h2 className="font-semibold">
          Ingredients pour {numberOfServings} personne
          {numberOfServings > 1 ? "s" : ""} :
        </h2>
        <div id="quantity">
          <button
            className="bg-gray-200 px-2 rounded-bl-lg rounded-tl-lg hover:bg-gray-300 hover:cursor-pointer"
            onClick={handleDecrease}
          >
            -
          </button>
          <button
            className="bg-gray-200 px-2 rounded-br-lg rounded-tr-lg hover:bg-gray-300 hover:cursor-pointer"
            onClick={handleIncrease}
          >
            +
          </button>
        </div>
      </div>
      <ul className="list-disc pl-5">
        {updatedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
}
