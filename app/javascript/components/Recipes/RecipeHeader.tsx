import { RecipeType } from "@customTypes/recipe.types";
import { Rating } from "@mui/material";

export default function RecipeHeader({
  recipe,
  showDescription = false,
  className = "",
}: {
  recipe: RecipeType;
  showDescription?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex-1 flex flex-col gap-8 ${className}`}>
      <div className="flex gap-6">
        <div className="flex-1 flex flex-col">
          <h3 className="text-3xl font-medium text-neutral-800 line-clamp-1 font-serif">
            {recipe.name}
          </h3>
          {recipe.user && (
            <span className=" text-neutral-600">
              par {recipe.user.username}
            </span>
          )}
          {showDescription && recipe.description && (
            <p className="text-neutral-400 text-sm italic mt-2 line-clamp-3">
              {recipe.description}
            </p>
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
    </div>
  );
}
