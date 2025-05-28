import { Badge, Button, Card } from "@components/ui";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { ItemCategory, ItemType } from "@customTypes/recipe.types";
import CategoryItem from "./CategoryItem";

export default function CategoryContainer({
  type,
  categories,
  onCategoryChange,
  onCategoryDelete,
}: {
  type: ItemType;
  categories: ItemCategory[];
  onCategoryChange: (newCategories: ItemCategory[]) => void;
  onCategoryDelete: (categoryIndex: number) => void;
}) {
  const totalItems = categories.reduce(
    (acc, category) => acc + category.items.length,
    0
  );

  const handleCategoryNameChange = (categoryIndex: number, newName: string) => {
    const updatedCategories = categories.map((category, index) =>
      index === categoryIndex ? { ...category, name: newName } : category
    );
    onCategoryChange(updatedCategories);
  };

  const handleCategoryDelete = (categoryIndex: number) => {
    onCategoryDelete(categoryIndex);
  };

  const handleAddCategoryClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    onCategoryChange([
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
          Ajouter une sous-catégorie
        </Button>
      </Card.Body>
    </Card>
  );
}
