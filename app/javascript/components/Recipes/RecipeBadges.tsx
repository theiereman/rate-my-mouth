import { Badge } from "@components/ui";
import { RecipeType } from "@customTypes/recipe.types";
import RecipeDifficultyBadge from "./RecipeDifficultyBadge";

export default function RecipeBadges({ recipe }: { recipe: RecipeType }) {
  return (
    <div className="flex flex-col">
      <div id="badges" className="flex flex-wrap">
        <Badge
          text={`${recipe.number_of_servings} portions`}
          variant="accent"
        />
        <Badge
          text={`${recipe.ingredients?.length || 0} ingrédients`}
          variant="secondary"
        />
        <Badge
          text={`${recipe.instructions?.length || 0} étapes`}
          variant="primary"
        />
        <RecipeDifficultyBadge difficulty={recipe.difficulty_value} />
      </div>

      <div id="tags" className="flex flex-wrap items-center gap-2">
        <h2 className="text-sm italic">Tags : </h2>
        {recipe.tags && recipe.tags.length === 0 ? (
          <span className="text-neutral-500 text-sm italic">Aucun tag</span>
        ) : (
          recipe.tags?.map((tag) => (
            <Badge text={tag.name} key={tag.id} variant="neutral" />
          ))
        )}
      </div>
    </div>
  );
}
