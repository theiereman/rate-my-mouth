import { Rating } from "@mui/material";
import { RecipeType } from "../../../types/recipe.types";
import { Badge } from "../../../components";

export default function RecipeRatingAverage({
  recipe,
}: {
  recipe: RecipeType;
}) {
  // Fonction pour obtenir un texte descriptif basé sur la note moyenne
  const getRatingDescription = (rating: number): string => {
    if (rating >= 4.5) return "Exceptionnel";
    if (rating >= 4.0) return "Excellent";
    if (rating >= 3.5) return "Très bon";
    if (rating >= 3.0) return "Bon";
    if (rating >= 2.5) return "Correct";
    if (rating >= 2.0) return "Moyen";
    if (rating >= 1.5) return "Décevant";
    if (rating >= 1.0) return "Mauvais";
    if (rating > 0) return "Très mauvais";
    return "Pas encore noté";
  };

  // Fonction pour obtenir une couleur basée sur la note moyenne
  const getRatingColor = (rating: number): string => {
    if (rating >= 4.0) return "success";
    if (rating >= 3.0) return "primary";
    if (rating >= 2.0) return "warning";
    return "error";
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-neutral-800">Note moyenne</h3>
        <div className="flex items-center gap-2">
          {recipe.average_rating > 0 && (
            <Badge variant={getRatingColor(recipe.average_rating)} size="sm">
              {recipe.average_rating.toFixed(1)}
            </Badge>
          )}
          <Badge variant="neutral" size="sm">
            {recipe.ratings.length} avis
          </Badge>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <Rating
          value={recipe.average_rating}
          readOnly
          precision={0.5}
          size="large"
          className="text-primary-500"
        />

        {recipe.average_rating > 0 && (
          <span className="text-sm text-neutral-600">
            {getRatingDescription(recipe.average_rating)}
          </span>
        )}
      </div>

      {recipe.ratings.length === 0 && (
        <p className="text-sm text-neutral-500 mt-2 italic">
          Cette recette n'a pas encore été notée
        </p>
      )}
    </div>
  );
}
