import { Badge, Button, Input } from "@components/ui";
import RecipeContentFormCategoryContainer from "./RecipeContentFormCategoryContainer";
import { useTextTypeDetection } from "@hooks/useTextTypeDetection";
import { useState, useEffect } from "react";
import {
  ItemType,
  RecipeItem,
  IngredientType,
  InstructionType,
} from "@customTypes/recipe.types";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import { Section } from "@components/ui";
import { capitalize } from "lodash";

interface RecipeContentSubformProps {
  initialIngredients?: IngredientType[];
  initialInstructions?: InstructionType[];
  onDataChange?: (data: {
    ingredients_attributes: {
      id?: number;
      name: string;
      category: string;
      _destroy?: boolean;
    }[];
    instructions_attributes: {
      id?: number;
      name: string;
      category: string;
      _destroy?: boolean;
    }[];
  }) => void;
}

export default function RecipeContentForm({
  initialIngredients = [],
  initialInstructions = [],
  onDataChange,
}: RecipeContentSubformProps) {
  const [ingredients, setIngredients] = useState<RecipeItem[]>([]);
  const [instructions, setInstructions] = useState<RecipeItem[]>([]);

  const [lastUsedCategory, setLastUsedCategory] = useState<
    Map<ItemType, string>
  >(new Map());

  useEffect(() => {
    const initialIngredientsItems: RecipeItem[] = initialIngredients.map(
      (ingredient) => ({
        id: uuidv4(),
        type: "ingredient" as ItemType,
        value: ingredient.name,
        category: ingredient.category || "",
        dbId: ingredient.id,
      }),
    );

    const initialInstructionsItems: RecipeItem[] = initialInstructions.map(
      (instruction) => ({
        id: uuidv4(),
        type: "instruction" as ItemType,
        value: instruction.name,
        category: instruction.category || "",
        dbId: instruction.id,
      }),
    );

    setIngredients(initialIngredientsItems);
    setInstructions(initialInstructionsItems);
  }, []);

  useEffect(() => {
    if (onDataChange) {
      const ingredientsAttributes = ingredients.map((item) => ({
        id: item.dbId,
        name: item.value,
        category: item.category,
        _destroy: item._destroy || false,
      }));

      const instructionsAttributes = instructions.map((item) => ({
        id: item.dbId,
        name: item.value,
        category: item.category,
        _destroy: item._destroy || false,
      }));

      onDataChange({
        ingredients_attributes: ingredientsAttributes,
        instructions_attributes: instructionsAttributes,
      });
    }
  }, [ingredients, instructions]);

  const items = ingredients.concat(instructions);

  const visibleIngredients = ingredients.filter((item) => !item._destroy);
  const visibleInstructions = instructions.filter((item) => !item._destroy);

  const { inputText, setInputText, detectedType } = useTextTypeDetection();

  const addItem = (text: string, type: ItemType) => {
    if (!text.trim()) return;

    if (type === "ingredient") {
      setIngredients([
        ...ingredients,
        {
          id: Date.now().toString(),
          type: "ingredient",
          value: text,
          category: lastUsedCategory.get("ingredient") || "",
        },
      ]);
    } else {
      setInstructions([
        ...instructions,
        {
          id: Date.now().toString(),
          type: "instruction",
          value: text,
          category: lastUsedCategory.get("instruction") || "",
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
        const updatedItem = {
          ...item,
          category: categName,
          type: categType,
          dbId: categType === itemType ? item.dbId : undefined,
        };

        setLastUsedCategory((prev) => {
          prev.set(categType, categName);
          return new Map(prev);
        });

        if (itemType === "ingredient") {
          if (item.dbId) {
            setIngredients((prev) =>
              prev.map((i) => (i.id === itemId ? { ...i, _destroy: true } : i)),
            );
          } else {
            setIngredients((prev) => prev.filter((i) => i.id !== itemId));
          }
        } else {
          if (item.dbId) {
            setInstructions((prev) =>
              prev.map((i) => (i.id === itemId ? { ...i, _destroy: true } : i)),
            );
          } else {
            setInstructions((prev) => prev.filter((i) => i.id !== itemId));
          }
        }

        if (categType === "ingredient") {
          setIngredients((prev) => {
            const existingItemIndex = prev.findIndex((i) => i.id === itemId);
            if (existingItemIndex >= 0) {
              return prev.map((i) => (i.id === itemId ? updatedItem : i));
            } else {
              return [...prev, updatedItem];
            }
          });
        } else {
          setInstructions((prev) => {
            const existingItemIndex = prev.findIndex((i) => i.id === itemId);
            if (existingItemIndex >= 0) {
              return prev.map((i) => (i.id === itemId ? updatedItem : i));
            } else {
              return [...prev, updatedItem];
            }
          });
        }
      }
    }
  };

  const updateItem = (id: string, value: string) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item)),
    );
    setInstructions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item)),
    );
  };

  const deleteItem = (id: string) => {
    const ingredientToDelete = ingredients.find((item) => item.id === id);
    const instructionToDelete = instructions.find((item) => item.id === id);

    if (ingredientToDelete) {
      if (ingredientToDelete.dbId) {
        setIngredients((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, _destroy: true } : item,
          ),
        );
      } else {
        setIngredients((prev) => prev.filter((item) => item.id !== id));
      }
    }

    if (instructionToDelete) {
      if (instructionToDelete.dbId) {
        setInstructions((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, _destroy: true } : item,
          ),
        );
      } else {
        setInstructions((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  const handleCategoryNameChange = (
    oldName: string,
    newName: string,
    type: ItemType,
  ) => {
    setLastUsedCategory((prev) => {
      prev.set(type, newName);
      return new Map(prev);
    });

    if (type === "ingredient") {
      setIngredients((prev) =>
        prev.map((item) =>
          item.category === oldName ? { ...item, category: newName } : item,
        ),
      );
    } else {
      setInstructions((prev) =>
        prev.map((item) =>
          item.category === oldName ? { ...item, category: newName } : item,
        ),
      );
    }
  };

  const handleCategoryDelete = (name: string, type: ItemType) => {
    setLastUsedCategory((prev) => {
      prev.set(type, "");
      return new Map(prev);
    });

    if (type === "ingredient") {
      setIngredients((prev) =>
        prev.map((item) =>
          item.category === name ? { ...item, category: "" } : item,
        ),
      );
    } else {
      setInstructions((prev) =>
        prev.map((item) =>
          item.category === name ? { ...item, category: "" } : item,
        ),
      );
    }
  };

  return (
    <Section title="Ingrédients et instructions" variant="ghost">
      <div className="flex flex-col gap-2">
        <div className="flex w-full flex-col gap-2 sm:flex-row">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="2 oeufs, cuire la viande pendant 1h, etc."
          />

          <div className="flex gap-2">
            <Button
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                addItem(inputText, "ingredient");
              }}
            >
              <span className="material-symbols-outlined">add</span>
              Ingredient
            </Button>
            <Button
              className="w-full"
              onClick={(e) => {
                e.preventDefault();
                addItem(inputText, "instruction");
              }}
            >
              <span className="material-symbols-outlined">add</span>
              Instruction
            </Button>
          </div>
        </div>

        {inputText.trim() && (
          <Badge className="w-full">
            {capitalize(detectedType)} - Appuyez sur Entrée pour ajouter
          </Badge>
        )}

        <div className="flex flex-col gap-2 md:flex-row">
          <DndContext
            onDragEnd={handleDragEnd}
            sensors={useSensors(
              useSensor(PointerSensor, {
                activationConstraint: { distance: 8 },
              }),
              useSensor(TouchSensor, {
                activationConstraint: { delay: 250, tolerance: 5 },
              }),
            )}
          >
            <RecipeContentFormCategoryContainer
              items={visibleIngredients}
              type="ingredient"
              onItemUpdate={updateItem}
              onItemDelete={deleteItem}
              onCategoryNameChange={(name, newName) =>
                handleCategoryNameChange(name, newName, "ingredient")
              }
              onCategoryDelete={(name) =>
                handleCategoryDelete(name, "ingredient")
              }
            />
            <RecipeContentFormCategoryContainer
              items={visibleInstructions}
              type="instruction"
              onItemUpdate={updateItem}
              onItemDelete={deleteItem}
              onCategoryNameChange={(name, newName) =>
                handleCategoryNameChange(name, newName, "instruction")
              }
              onCategoryDelete={(name) =>
                handleCategoryDelete(name, "instruction")
              }
            />
          </DndContext>
        </div>
      </div>
    </Section>
  );
}
