import { RecipeType } from "@customTypes/recipe.types";
import { Rating } from "@mui/material";
import DifficultyBadge from "@components/Recipes/RecipeDifficulty";
import { Badge } from "@components/ui";

export default function RecipeHeader({
  recipe,
  className = "",
}: {
  recipe: RecipeType;
  className?: string;
}) {
  return (
    <div className={`flex-1 flex flex-col gap-8 ${className}`}>
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col">
          <h3 className="text-4xl font-medium text-neutral-800 line-clamp-1 font-serif">
            {recipe.name}
          </h3>
          {recipe.user && (
            <span className=" text-neutral-600">
              par {recipe.user.username}
            </span>
          )}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Rating
            size="medium"
            precision={0.5}
            value={recipe.average_rating}
            readOnly
          />
          <span className="text-sm text-neutral-600">
            {`${recipe.average_rating.toFixed(1)} sur ${
              recipe.ratings_count
            } avis`}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div id="badges" className="flex-1 flex flex-wrap gap-2">
          <Badge
            text={`${recipe.number_of_servings} portions`}
            variant="accent"
            size="md"
          />
          <Badge
            text={`${recipe.ingredients?.length || 0} ingrédients`}
            variant="secondary"
            size="md"
          />
          <Badge
            text={`${recipe.instructions?.length || 0} étapes`}
            variant="primary"
            size="md"
          />
          <DifficultyBadge difficulty={recipe.difficulty_value} />
        </div>
        {recipe.tags && recipe.tags.length > 0 && (
          <div id="tags" className="flex flex-wrap items-start gap-2">
            <h2 className="text-sm italic">Tags : </h2>
            {recipe.tags.map((tag) => (
              <Badge text={tag.name} key={tag.id} variant="neutral" size="md" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
