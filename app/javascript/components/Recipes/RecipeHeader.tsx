import UserLink from "@components/Users/UserLink";
import { RecipeType } from "@customTypes/recipe.types";
import { formatDateTime } from "@helpers/date-helper";
import { Rating } from "@mui/material";

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
    <div className={`flex-1 md:flex gap-6 ${className}`}>
      <div className="flex-1 flex flex-col gap-2">
        <h3
          title={recipe.name}
          className="text-4xl font-medium text-neutral-800 line-clamp-2 sm:line-clamp-1 font-serif"
        >
          {recipe.name}
        </h3>
        {recipe.user && (
          <span className="text-neutral-400 text-sm flex flex-col md:flex-row gap-1">
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
            className="text-neutral-500 text-sm italic my-4 line-clamp-6"
          >
            {recipe.description}
          </p>
        )}
        <div className="text-xs text-neutral-400"></div>
      </div>
      <div className="flex flex-col items-start sm:items-end gap-1">
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
  );
}
