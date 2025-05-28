import { Button, Card, Input } from "@components/ui";
import CategoryContainer from "./CategoryContainer";
import { useTextTypeDetection } from "@hooks/useTextTypeDetection";
import { useState } from "react";
import { ItemCategory, ItemType } from "@customTypes/recipe.types";

export default function RecipeContentSubform() {
  const [ingredientCategories, setIngredientCategories] = useState<
    ItemCategory[]
  >([]);
  const [instructionsCategories, setInstructionsCategories] = useState<
    ItemCategory[]
  >([]);

  const { inputText, setInputText, detectedType } = useTextTypeDetection();

  const getDefaultCategory = (type: ItemType) => {
    const categories =
      type === "ingredient"
        ? [...ingredientCategories]
        : [...instructionsCategories];
    return (
      categories.find((cat) => cat.name === "" && cat.type === type) || {
        name: "",
        type: type,
        color: "#f3f4f6",
        items: [],
      }
    );
  };

  const handleCategoryDelete = (type: ItemType, index: number) => {
    const categories =
      type === "ingredient"
        ? [...ingredientCategories]
        : [...instructionsCategories];

    const defaultCategory = getDefaultCategory(type);
    defaultCategory.items.push(...categories[index].items);

    const updatedCategories = categories.filter((_, i) => i !== index);

    if (type === "ingredient") {
      setIngredientCategories(updatedCategories);
    } else {
      setInstructionsCategories(updatedCategories);
    }
  };

  const addItemToDefaultCategory = (text: string, type: ItemType) => {
    text = text.trim();
    if (!text) return;

    const categories =
      type === "ingredient"
        ? [...ingredientCategories]
        : [...instructionsCategories];
    let defaultCategory = categories.find(
      (cat) => cat.name === "" && cat.type === type
    );

    if (!defaultCategory) {
      defaultCategory = getDefaultCategory(type);
      categories.push(defaultCategory);
    }

    defaultCategory.items.push({
      type: type,
      value: text,
    });

    if (type === "instruction") {
      setInstructionsCategories(categories);
    } else {
      setIngredientCategories(categories);
    }

    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItemToDefaultCategory(inputText, detectedType);
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex gap-2 w-full">
        <Input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          containerClassName="flex-1"
          placeholder="2 oeufs, cuire la viande pendant 1h, etc."
          className={
            detectedType === "ingredient"
              ? "border-primary-500 bg-primary-50"
              : detectedType === "instruction"
              ? "border-secondary-500 bg-secondary-50"
              : ""
          }
        ></Input>
        <Button
          variant="primary"
          onClick={(e) => {
            e.preventDefault();
            addItemToDefaultCategory(inputText, "ingredient");
          }}
        >
          Ingredient
        </Button>
        <Button
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            addItemToDefaultCategory(inputText, "instruction");
          }}
        >
          Instruction
        </Button>
      </div>
      <div className="flex gap-4">
        <CategoryContainer
          categories={ingredientCategories}
          onCategoryChange={setIngredientCategories}
          onCategoryDelete={(index) => {
            handleCategoryDelete("ingredient", index);
          }}
          type="ingredient"
        ></CategoryContainer>
        <CategoryContainer
          categories={instructionsCategories}
          onCategoryChange={setInstructionsCategories}
          onCategoryDelete={(index) => {
            handleCategoryDelete("instruction", index);
          }}
          type="instruction"
        ></CategoryContainer>
      </div>
    </Card>
  );
}
