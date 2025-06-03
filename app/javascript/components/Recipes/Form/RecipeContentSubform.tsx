import { Badge, Button, Card, Input } from "@components/ui";
import ItemsCategorizer from "./ItemsCategorizer";
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

export default function RecipeContentSubform({
  initialIngredients = [],
  initialInstructions = [],
  onDataChange,
}: RecipeContentSubformProps) {
  const [ingredients, setIngredients] = useState<RecipeItem[]>([]);
  const [instructions, setInstructions] = useState<RecipeItem[]>([]);

  // store the last "used" category to automatically add the new items to that category
  const [lastUsedCategory, setLastUsedCategory] = useState<
    Map<ItemType, string>
  >(new Map());

  // Initialiser les données depuis les props
  useEffect(() => {
    const initialIngredientsItems: RecipeItem[] = initialIngredients.map(
      (ingredient) => ({
        id: ingredient.id?.toString() || Date.now().toString(),
        type: "ingredient" as ItemType,
        value: ingredient.name,
        category: ingredient.category || "",
        dbId: ingredient.id, // Garder l'ID de la base de données pour les mises à jour
      })
    );

    const initialInstructionsItems: RecipeItem[] = initialInstructions.map(
      (instruction) => ({
        id: instruction.id?.toString() || Date.now().toString(),
        type: "instruction" as ItemType,
        value: instruction.name,
        category: instruction.category || "",
        dbId: instruction.id, // Garder l'ID de la base de données pour les mises à jour
      })
    );

    setIngredients(initialIngredientsItems);
    setInstructions(initialInstructionsItems);
  }, []);

  // Notifier le parent des changements
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

  // Filtrer les éléments non supprimés pour l'affichage
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
          dbId: undefined,
          category: categName,
          type: categType, // Update the type to match the target category
        };

        //set last used category depending on type
        setLastUsedCategory((prev) => {
          prev.set(categType, categName);
          return new Map(prev);
        });

        if (itemType === "ingredient") {
          setIngredients((prev) =>
            prev.map((i) => (i.id === itemId ? { ...i, _destroy: true } : i))
          );
        } else {
          setInstructions((prev) =>
            prev.map((i) => (i.id === itemId ? { ...i, _destroy: true } : i))
          );
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

  const updateItem = (id: string, value: string) => {
    setIngredients((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
    setInstructions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, value } : item))
    );
  };

  const deleteItem = (id: string) => {
    // Pour les éléments existants (avec dbId), on les marque comme _destroy
    // Pour les nouveaux éléments, on les supprime directement
    const ingredientToDelete = ingredients.find((item) => item.id === id);
    const instructionToDelete = instructions.find((item) => item.id === id);

    if (ingredientToDelete) {
      if (ingredientToDelete.dbId) {
        // Élément existant : on le marque comme détruit mais on le garde pour le formulaire
        setIngredients((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, _destroy: true } : item
          )
        );
      } else {
        // Nouvel élément : on le supprime directement
        setIngredients((prev) => prev.filter((item) => item.id !== id));
      }
    }

    if (instructionToDelete) {
      if (instructionToDelete.dbId) {
        // Élément existant : on le marque comme détruit mais on le garde pour le formulaire
        setInstructions((prev) =>
          prev.map((item) =>
            item.id === id ? { ...item, _destroy: true } : item
          )
        );
      } else {
        // Nouvel élément : on le supprime directement
        setInstructions((prev) => prev.filter((item) => item.id !== id));
      }
    }
  };

  const handleCategoryNameChange = (
    oldName: string,
    newName: string,
    type: ItemType
  ) => {
    setLastUsedCategory((prev) => {
      prev.set(type, newName);
      return new Map(prev);
    });

    if (type === "ingredient") {
      setIngredients((prev) =>
        prev.map((item) =>
          item.category === oldName ? { ...item, category: newName } : item
        )
      );
    } else {
      setInstructions((prev) =>
        prev.map((item) =>
          item.category === oldName ? { ...item, category: newName } : item
        )
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
          item.category === name ? { ...item, category: "" } : item
        )
      );
    } else {
      setInstructions((prev) =>
        prev.map((item) =>
          item.category === name ? { ...item, category: "" } : item
        )
      );
    }
  };

  return (
    <Card className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2 w-full">
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

        <div className="flex gap-2 justify-end">
          <Button
            variant="primary"
            onClick={(e) => {
              e.preventDefault();
              addItem(inputText, "ingredient");
            }}
          >
            <span className="material-symbols-outlined">add</span>
            Ingredient
          </Button>
          <Button
            variant="secondary"
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
        <>
          {detectedType === "ingredient" ? (
            <Badge variant="primary" size="md">
              Détecté comme ingrédient - Appuyez sur Entrée pour ajouter
            </Badge>
          ) : (
            <Badge variant="secondary" size="md">
              Détecté comme instruction - Appuyez sur Entrée pour ajouter
            </Badge>
          )}
        </>
      )}
      <ul className="text-sm text-neutral-600">
        <li className="flex items-start gap-2">
          <span className="material-symbols-outlined text-primary-600">
            check
          </span>
          <span>
            Les <strong>ingrédients</strong> contiennent généralement des
            quantités (ex: "2 oeufs", "200g de farine", "une pincée de sel")
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="material-symbols-outlined text-secondary-600">
            check
          </span>
          <span>
            Les <strong>instructions</strong> commencent souvent par un verbe
            d'action (ex: "Mélanger les ingrédients", "Cuire pendant 10
            minutes")
          </span>
        </li>
      </ul>
      <div className="flex flex-col md:flex-row gap-4">
        <DndContext
          onDragEnd={handleDragEnd}
          sensors={useSensors(
            useSensor(PointerSensor, {
              activationConstraint: { distance: 8 },
            }),
            useSensor(TouchSensor, {
              activationConstraint: { delay: 250, tolerance: 5 },
            })
          )}
        >
          <ItemsCategorizer
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
          <ItemsCategorizer
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
    </Card>
  );
}
