import Rating from "@mui/material/Rating";
import { RatingType } from "../types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Badge } from "../../../components/ui";

export default function UserRating({
  recipeId,
  rating,
  className,
}: {
  recipeId: number;
  rating?: RatingType;
  className?: string;
}) {
  const [hover, setHover] = useState(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: any, newValue: any) => {
    e.preventDefault();
    if (newValue === null) return;

    setIsSubmitting(true);
    router.post(
      `/recipes/${recipeId}/ratings`,
      { value: newValue },
      {
        preserveScroll: true,
        onSuccess: () => {
          setIsSubmitting(false);
        },
        onError: () => {
          setIsSubmitting(false);
        },
      }
    );
  };

  const labels: { [index: number]: string } = {
    0.5: "Horrible",
    1: "Très mauvais",
    1.5: "Mauvais",
    2: "Décevant",
    2.5: "Moyen",
    3: "Correct",
    3.5: "Bon",
    4: "Très bon",
    4.5: "Excellent",
    5: "Parfait",
  };

  return (
    <div className={`${className}`}>
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-neutral-800">Votre évaluation</h3>
        {rating?.value && (
          <Badge variant="primary" size="sm">
            {rating.value.toFixed(1)}
          </Badge>
        )}
      </div>

      <div className="flex flex-col items-center sm:flex-row sm:items-center gap-2">
        <Rating
          name="user-rating"
          precision={0.5}
          value={rating?.value ?? null}
          onChange={handleChange}
          onChangeActive={(event, newHover) => {
            setHover(newHover);
          }}
          size="large"
          disabled={isSubmitting}
          className="text-primary-500"
        />

        {(hover !== -1 || rating?.value) && (
          <span className="text-sm text-neutral-600 min-w-[100px]">
            {labels[hover !== -1 ? hover : rating?.value || 0]}
          </span>
        )}
      </div>

      <p className="text-xs text-neutral-500 mt-2">
        Cliquez sur les étoiles pour modifier votre note
      </p>
    </div>
  );
}
