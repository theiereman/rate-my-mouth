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
        <div className="flex flex-col h-full sm:flex-row gap-4">
          <RecipeThumbnail
            thumbnailUrl={recipe.thumbnail_url}
            format="square"
          />

          <div className="flex-1 flex flex-col gap-3">
            <div className="flex flex-col">
              <h3 className="text-lg font-medium text-neutral-800 line-clamp-1">
                {recipe.name}
              </h3>
              {recipe.user && (
                <span className="text-sm text-neutral-600">
                  par {recipe.user.username}
                </span>
              )}
            </div>

            <Rating
              size="small"
              precision={0.5}
              value={recipe.average_rating}
              readOnly
              className="text-primary-400"
            />

            <div className="flex flex-wrap gap-3">
              <Badge variant="primary" className="gap-1">
                <span className="material-symbols-outlined material-icon--sm material-icon--fill">
                  comment
                </span>
                {`${recipe.comments_count} commentaire${
                  recipe.comments_count > 1 ? "s" : ""
                }`}
              </Badge>

              <Badge variant="primary" className="gap-1">
                <span className="material-symbols-outlined material-icon--sm material-icon--fill">
                  star
                </span>
                {`${recipe.ratings_count} note${
                  recipe.ratings_count > 1 ? "s" : ""
                }`}
              </Badge>
            </div>

            <div className="flex flex-wrap gap-3">
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
