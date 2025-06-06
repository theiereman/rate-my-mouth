import { Link } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import { Card } from "@components/ui";

import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";
import RecipeHeader from "@components/Recipes/RecipeHeader";
import RecipeBadges from "@components/Recipes/RecipeBadges";

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

          <div className="flex-1 flex flex-col justify-between">
            <RecipeHeader recipe={recipe} />
            <RecipeBadges recipe={recipe} />
          </div>
        </div>
      </Card>
    </Link>
  );
}
