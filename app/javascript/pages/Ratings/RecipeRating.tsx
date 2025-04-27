import Rating from "@mui/material/Rating";
import { RatingType } from "./types";
import { router } from "@inertiajs/react";

export default function RecipeRating({
  recipeId,
  rating,
}: {
  recipeId: number;
  rating?: RatingType;
}) {
  const handleChange = (e: any, newValue: any) => {
    e.preventDefault();
    router.post(`/recipes/${recipeId}/ratings`, { value: newValue });
  };

  return (
    <Rating
      name="half-rating"
      precision={0.5}
      value={rating?.value ?? null}
      onChange={handleChange}
    />
  );
}
