import AverageRatingDisplay from "@components/Ratings/AverageRatingDisplay";
import UserLink from "@components/Users/UserLink";
import { RecipeType } from "@customTypes/recipe.types";
import { formatDateTime } from "@helpers/date-helper";
import DifficultyDisplay from "./v2/DifficultyDisplay";
import RecipeBadges from "./RecipeBadges";
import { Badge } from "@components/ui";

type RecipeHeaderProps = {
  recipe: RecipeType;
  showDescription?: boolean;
  className?: string;
  enableUserlink?: boolean;
};

export default function RecipeHeader({
  recipe,
  showDescription = false,
  enableUserlink = false,
  className = "",
}: RecipeHeaderProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className={`flex-1 gap-6 md:flex ${className}`}>
        <div className="flex flex-1 flex-col gap-2 md:gap-0">
          <h3
            title={recipe.name}
            className="line-clamp-2 text-2xl font-bold text-neutral-800 sm:line-clamp-1"
          >
            {recipe.name}
          </h3>
          {recipe.user && (
            <span className="text-primary-900/60! flex flex-col gap-1 text-sm md:flex-row">
              <UserLink
                prefix="Par"
                user={recipe.user}
                className="text-primary-900/60! text-sm!"
                disabled={!enableUserlink}
              />
              <span>le {formatDateTime(recipe.created_at)}</span>
              {recipe.updated_at !== recipe.created_at && (
                <span> (modifiée le {formatDateTime(recipe.updated_at)})</span>
              )}
            </span>
          )}
          {showDescription && recipe.description && (
            <p
              title={recipe.description}
              className="my-4 line-clamp-6 text-sm text-neutral-500 italic"
            >
              {recipe.description}
            </p>
          )}
          <div className="text-xs text-neutral-400"></div>
        </div>
        <AverageRatingDisplay
          value={recipe.average_rating}
          numberOfRatings={recipe.ratings_count}
          className="md:items-end"
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row md:items-center">
        <div className="flex flex-1 flex-wrap gap-2">
          {recipe.tags?.map((tag) => (
            <Badge>{tag.name}</Badge>
          ))}
        </div>
        <DifficultyDisplay difficulty={recipe.difficulty} />
      </div>
    </div>
  );
}
