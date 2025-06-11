import Rating from "@mui/material/Rating";
import { RatingType } from "@customTypes/rating.types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Badge, Button } from "@components/ui";

export default function RatingForm({
  recipeId,
  rating,
  className,
}: {
  recipeId: number;
  rating?: RatingType;
  className?: string;
}) {
  const [value, setValue] = useState<number | null>(rating?.value ?? null);
  const [pendingValue, setPendingValue] = useState<number | null>(value);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pendingUpdate = pendingValue !== null && pendingValue !== value;

  console.log(pendingValue);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (pendingValue === null || !pendingUpdate) return;
    setIsSubmitting(true);
    router.post(
      `/recipes/${recipeId}/ratings`,
      { value: pendingValue },
      {
        preserveScroll: true,
        onFinish: () => {
          setIsSubmitting(false);
          setValue(pendingValue);
        },
      }
    );
  };

  const handleChange = (e: any, newValue: any) => {
    e.preventDefault();
    if (isSubmitting || newValue === null) return;
    setPendingValue(newValue);
  };

  return (
    <div className="flex flex-col gap-2">e
      <div className={`flex items-stretch gap-2 ${className}`}>
        <Rating
          name="user-rating"
          precision={0.5}
          value={pendingValue ?? value}
          onChange={handleChange}
          size="large"
          disabled={isSubmitting}
          className="text-primary-500 m-auto"
        />
        {pendingValue && (
          <Badge
            text={`${pendingValue?.toFixed(1)}${pendingUpdate ? "*" : ""}`}
            variant={pendingUpdate ? "warning" : "primary"}
          />
        )}
        <Button
          className="flex-1"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi..." : "Noter"}
        </Button>
      </div>
    </div>
  );
}
