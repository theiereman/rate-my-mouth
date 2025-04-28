import Rating from "@mui/material/Rating";
import { RatingType } from "../types";
import { router } from "@inertiajs/react";

export default function UserRating({
  recipeId,
  rating,
  className,
}: {
  recipeId: number;
  rating?: RatingType;
  className?: string;
}) {
  const handleChange = (e: any, newValue: any) => {
    e.preventDefault();
    router.post(`/recipes/${recipeId}/ratings`, { value: newValue });
  };

  return (
    <div className={className}>
      <h1 className="font-semibold">Ma note</h1>
      <Rating
        name="half-rating"
        precision={0.5}
        value={rating?.value ?? null}
        onChange={handleChange}
        size="large"
      />
    </div>
  );
}
