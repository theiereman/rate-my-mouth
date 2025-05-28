import { Badge, Button, Card } from "@components/ui";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { ItemCategory, ItemType } from "@customTypes/recipe.types";
import { useState } from "react";
import CategoryItem from "./CategoryItem";

type CategoryWithColor = ItemCategory & { color: string };

export default function CategoryContainer({
  type,
  initialCategories = [],
}: {
  type: ItemType;
  initialCategories?: ItemCategory[];
}) {
  const [categories, setCategories] = useState<CategoryWithColor[]>(
    initialCategories.map((category) => ({
      ...category,
      color: `hsl(${Math.floor(Math.random() * 360)}, 50%, 90%)`,
    }))
  );

  const totalItems = initialCategories.reduce(
    (acc, category) => acc + category.items.length,
    0
  );

  const handleCategoryNameChange = (categoryIndex: number, newName: string) => {
    const updatedCategories = categories.map((category, index) =>
      index === categoryIndex ? { ...category, name: newName } : category
    );
    setCategories(updatedCategories);
  };

  const handleCategoryDelete = (categoryIndex: number) => {
    const updatedCategories = categories.filter(
      (_, index) => index !== categoryIndex
    );
    setCategories(updatedCategories);
  };

  const handleAddCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCategories([
      ...categories,
      {
        name: `Catégorie ${categories.length + 1}`,
        items: [],
        type: type,
        color: `hsl(${Math.floor(Math.random() * 360)}, 50%, 90%)`,
      },
    ]);
  };

  return (
    <Card className="flex-1 p-0!" variant="flat">
      <Card.Header className="flex gap-2">
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-1">
          {type === "ingredient" ? "Ingrédients" : "Instructions"}
        </h2>
        <Badge>{totalItems}</Badge>
      </Card.Header>
      <Card.Body className="space-y-2">
        {categories.length === 0 ? (
          <EmptyPlaceholder
            text="Aucun élément ajouté"
            subtext="Utiliser le champs ci-dessus pour en ajouter de nouveaux."
          />
        ) : (
          categories.map((category, index) => (
            <CategoryItem
              key={`${category.name}-${index}`}
              name={category.name}
              color={category.color}
              items={category.items.map((item) => item.value)}
              onNameChange={(newName) =>
                handleCategoryNameChange(index, newName)
              }
              onDelete={() => handleCategoryDelete(index)}
            />
          ))
        )}
        <Button onClick={handleAddCategoryClick} variant="outline" fullWidth>
          Ajouter une catégorie
        </Button>
      </Card.Body>
    </Card>
  );
}
