import { Button, Card, Input } from "@components/ui";
import ItemsCategorizer from "./ItemsCategorizer";
import { useTextTypeDetection } from "@hooks/useTextTypeDetection";
import { useState } from "react";
import { ItemType, RecipeItem } from "@customTypes/recipe.types";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

export default function RecipeContentSubform() {
  const [ingredients, setIngredients] = useState<RecipeItem[]>([]);
  const [instructions, setInstructions] = useState<RecipeItem[]>([]);

  const items = ingredients.concat(instructions);

  const { inputText, setInputText, detectedType } = useTextTypeDetection();

  const addItem = (text: string, type: ItemType) => {
    if (type === "ingredient") {
      setIngredients([
        ...ingredients,
        {
          id: Date.now().toString(),
          type: "ingredient",
          value: text,
          category: "",
        },
      ]);
    } else {
      setInstructions([
        ...instructions,
        {
          id: Date.now().toString(),
          type: "instruction",
          value: text,
          category: "",
        },
      ]);
    }

    setInputText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      addItem(inputText, detectedType);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over) {
      const categName = over.data.current?.name;
      const categType = over.data.current?.type as ItemType;

      const itemId = active.id;
      const itemType = active.data.current?.type as ItemType;
      const item = items.find((item) => item.id === itemId);

      if (item) {
        // Create a copy of the item to avoid mutations
        const updatedItem = {
          ...item,
          category: categName,
          type: categType, // Update the type to match the target category
        };

        // Remove item from its current list
        if (itemType === "ingredient") {
          setIngredients((prev) => prev.filter((i) => i.id !== itemId));
        } else {
          setInstructions((prev) => prev.filter((i) => i.id !== itemId));
        }

        // Add item to the target list
        if (categType === "ingredient") {
          setIngredients((prev) => {
            // Check if item already exists in target list (shouldn't happen, but safety check)
            const existingItemIndex = prev.findIndex((i) => i.id === itemId);
            if (existingItemIndex >= 0) {
              // Update existing item
              return prev.map((i) => (i.id === itemId ? updatedItem : i));
            } else {
              // Add new item
              return [...prev, updatedItem];
            }
          });
        } else {
          setInstructions((prev) => {
            // Check if item already exists in target list (shouldn't happen, but safety check)
            const existingItemIndex = prev.findIndex((i) => i.id === itemId);
            if (existingItemIndex >= 0) {
              // Update existing item
              return prev.map((i) => (i.id === itemId ? updatedItem : i));
            } else {
              // Add new item
              return [...prev, updatedItem];
            }
          });
        }
      }
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
            addItem(inputText, "ingredient");
          }}
        >
          Ingredient
        </Button>
        <Button
          variant="secondary"
          onClick={(e) => {
            e.preventDefault();
            addItem(inputText, "instruction");
          }}
        >
          Instruction
        </Button>
      </div>
      <div className="flex gap-4">
        <DndContext onDragEnd={handleDragEnd}>
          <ItemsCategorizer items={ingredients} type="ingredient" />
          <ItemsCategorizer items={instructions} type="instruction" />
        </DndContext>
      </div>
    </Card>
  );
}
