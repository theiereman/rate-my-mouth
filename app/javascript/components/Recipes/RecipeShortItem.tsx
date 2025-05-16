import { Link } from "@inertiajs/react";
import { formatDate } from "@helpers/date-helper";
import { RecipeType } from "@customTypes/recipe.types";
import { Rating } from "@mui/material";
import { Badge, Card } from "@components/ui";
import DifficultyBadge from "@components/Recipes/RecipeDifficulty";
import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";

interface RecipeProps {
  recipe: RecipeType;
}

export default function RecipeShortItem({ recipe }: RecipeProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <Card
        className="transition-all duration-300 hover:shadow-md hover:border-primary-300 overflow-hidden"
        hover
      >
        <div className="flex flex-col sm:flex-row gap-4">
          <RecipeThumbnail recipe={recipe} size="sm" />

          <div className="flex-1">
            <div className="flex flex-col mb-3">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-medium text-neutral-800">
                  {recipe.name}
                </h3>
                <Rating
                  size="small"
                  precision={0.5}
                  value={recipe.average_rating}
                  readOnly
                  className="text-primary-400"
                />
              </div>
              <span className="text-sm text-neutral-600">
                par {recipe.user.username}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 mb-3">
              <Badge variant="primary" className="gap-1">
                <span className="material-symbols-outlined material-icon--sm material-icon--fill">
                  comment
                </span>
                {recipe.comments.length} commentaire
                {recipe.comments.length > 1 ? "s" : ""}
              </Badge>
              <Badge variant="secondary" className="gap-1">
                <span className="material-symbols-outlined material-icon--sm material-icon--fill">
                  star
                </span>
                {recipe.ratings.length} note
                {recipe.ratings.length > 1 ? "s" : ""}
              </Badge>
              <DifficultyBadge
                difficulty={recipe.difficulty_value}
              ></DifficultyBadge>

              {recipe.tags &&
                recipe.tags.length > 0 &&
                recipe.tags.map((tag) => (
                  <Badge key={tag.id} variant="neutral" size="sm">
                    {tag.name}
                  </Badge>
                ))}
            </div>

            <div className="text-xs text-neutral-500 flex flex-wrap gap-2">
              <span>Créé le {formatDate(recipe.created_at)}</span>
              <span>|</span>
              <span>Mis à jour le {formatDate(recipe.updated_at)}</span>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
