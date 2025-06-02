import { Badge, Button, Card } from "@components/ui";
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

  // Combine categories with items and empty categories, avoiding duplicates
  const allCategories = [...categories];
  emptyCategories.forEach((emptyCategory) => {
    if (!allCategories.find((cat) => cat.name === emptyCategory.name)) {
      allCategories.push(emptyCategory);
    }
  });

  const handleAddCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const newCategoryName = `Catégorie ${allCategories.length + 1}`;
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
    <Card
      ref={setNodeRef}
      className={`flex-1 p-0! ${
        isOver && over?.id === type ? "border-2 border-primary-500" : ""
      }`}
      variant="flat"
    >
      <Card.Header className="flex gap-2">
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-1">
          {type === "ingredient" ? "Ingrédients" : "Instructions"}
        </h2>
        <Badge>{items.length}</Badge>
      </Card.Header>
      <Card.Body className="space-y-2">
        {allCategories.length === 0 ? (
          <EmptyPlaceholder
            text={
              type == "ingredient"
                ? "Aucun ingrédient ajouté"
                : `Aucune instruction ajoutée`
            }
            subtext="Utiliser le champs ci-dessus pour en ajouter."
          />
        ) : (
          allCategories
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
            ))
        )}
        <Button onClick={handleAddCategoryClick} variant="outline" fullWidth>
          Ajouter une sous-catégorie
        </Button>
      </Card.Body>
    </Card>
  );
}
