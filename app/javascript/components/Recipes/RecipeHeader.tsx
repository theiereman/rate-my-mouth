import AverageRatingDisplay from "@components/Ratings/AverageRatingDisplay";
import UserLink from "@components/Users/UserLink";
import { RecipeType } from "@customTypes/recipe.types";
import { formatDateTime } from "@helpers/date-helper";

type RecipeHeaderProps = {
  recipe: RecipeType;
  showDescription?: boolean;
  className?: string;
  enableUserlink?: boolean;
};

export default function RecipeHeader({
  recipe,
  showDescription = false,
  className = "",
  enableUserlink = true,
}: RecipeHeaderProps) {
  return (
    <div className={`flex-1 gap-6 md:flex ${className}`}>
      <div className="flex flex-1 flex-col gap-2 md:gap-0">
        <h3
          title={recipe.name}
          className="line-clamp-2 font-serif text-4xl font-medium text-neutral-800 sm:line-clamp-1"
        >
          {recipe.name}
        </h3>
        {recipe.user && (
          <span className="flex flex-col gap-1 text-sm text-neutral-400 md:flex-row">
            <UserLink
              prefix="Par"
              user={recipe.user}
              className="text-sm!"
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
        size="lg"
        alignment="end"
      />
    </div>
  );
}
