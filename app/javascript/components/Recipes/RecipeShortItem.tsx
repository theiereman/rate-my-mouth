import { Link } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import { Card } from "@components/ui";

import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";
import RecipeHeader from "./RecipeHeader";

interface RecipeProps {
  recipe: RecipeType;
}

export default function RecipeShortItem({ recipe }: RecipeProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <Card variant="outlined" hover>
        <div className="flex flex-col h-full sm:flex-row gap-4">
          <RecipeThumbnail
            thumbnailUrl={recipe.thumbnail_url}
            format="square"
            className="h-40"
          />

          <RecipeHeader recipe={recipe} />
        </div>
      </Card>
    </Link>
  );
}
