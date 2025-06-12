import { Badge, Button } from "@components/ui";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { ItemCategory, ItemType, RecipeItem } from "@customTypes/recipe.types";
import CategoryItem from "./CategoryItem";
import { useState } from "react";
import { useDroppable } from "@dnd-kit/core";

export default function ItemsCategorizer({
  type,
  items,
  onItemUpdate,
  onItemDelete,
  onCategoryNameChange,
  onCategoryDelete,
}: {
  type: ItemType;
  items: RecipeItem[];
  onItemUpdate?: (id: string, value: string) => void;
  onItemDelete?: (id: string) => void;
  onCategoryNameChange?: (name: string, newName: string) => void;
  onCategoryDelete?: (name: string) => void;
}) {
  const [emptyCategories, setEmptyCategories] = useState<ItemCategory[]>([]);

  const { isOver, over, setNodeRef } = useDroppable({
    id: type || "",
    data: {
      name: "",
      type,
    },
  });

  const categories = items.reduce((acc, item) => {
    const category = acc.find((cat) => cat.name === item.category);
    if (!category) {
      const catName = item.category || "";
      acc.push({
        name: catName,
      });
    }
    return acc;
  }, [] as ItemCategory[]);

  const allCategories = [...categories];
  emptyCategories.forEach((emptyCategory) => {
    if (!allCategories.find((cat) => cat.name === emptyCategory.name)) {
      allCategories.push(emptyCategory);
    }
  });

  const handleAddCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    let maxIndex = 0;
    allCategories.forEach((cat) => {
      const match = cat.name.match(/^Catégorie (\d+)$/);
      if (match) {
        const index = parseInt(match[1], 10);
        if (index > maxIndex) {
          maxIndex = index;
        }
      }
    });

    const newCategoryName = `Catégorie ${maxIndex + 1}`;

    setEmptyCategories([
      ...emptyCategories,
      {
        name: newCategoryName,
      },
    ]);
  };

  const handleCategoryNameChange = (oldName: string, newName: string) => {
    setEmptyCategories((prev) =>
      prev.map((cat) =>
        cat.name === oldName ? { ...cat, name: newName } : cat
      )
    );
    onCategoryNameChange && onCategoryNameChange(oldName, newName);
  };

  const handleCategoryDelete = (name: string) => {
    setEmptyCategories((prev) => prev.filter((cat) => cat.name !== name));
    onCategoryDelete && onCategoryDelete(name);
  };

  return (
    <div
      ref={setNodeRef}
      className={`flex-1 space-y-4 ${
        isOver && over?.id === type ? "border-2 border-primary-500" : ""
      }`}
    >
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-1">
          {type === "ingredient" ? "Ingrédients" : "Instructions"}
          <Badge
            text={items.length.toString()}
            variant={type === "ingredient" ? "primary" : "secondary"}
          />
        </h2>
        {items.length > 0 && (
          <p className="text-xs flex items-center gap-1 text-neutral-400">
            <span className="material-symbols-outlined material-icon--sm">
              info
            </span>
            Les éléments sont déplaçables entre les sous-catégories.
          </p>
        )}
      </div>
      {allCategories.length === 0 ? (
        <EmptyPlaceholder
          text={
            type == "ingredient"
              ? "Aucun ingrédient ajouté"
              : `Aucune instruction ajoutée`
          }
          subtext="Utiliser le champs ci-dessus pour en ajouter."
          variant={type === "ingredient" ? "primary" : "secondary"}
        />
      ) : (
        <>
          {allCategories
            .sort((a, b) => a.name.localeCompare(b.name))
            .map((category, index) => (
              <CategoryItem
                key={`${category.name}-${index}`}
                name={category.name}
                type={type}
                color={category.color}
                items={items.filter((item) => item.category === category.name)}
                onItemUpdate={onItemUpdate}
                onItemDelete={onItemDelete}
                onNameChange={(newName) =>
                  handleCategoryNameChange(category.name, newName)
                }
                onDelete={() => handleCategoryDelete(category.name)}
              />
            ))}
        </>
      )}
      <Button onClick={handleAddCategoryClick} variant="outline" fullWidth>
        Ajouter une sous-catégorie
      </Button>
    </div>
  );
}
