import { RatingType } from "@customTypes/rating.types";
import { router } from "@inertiajs/react";
import { useState } from "react";
import { Button } from "@components/ui";
import RatingItem from "../RatingItem";

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
      },
    );
  };

  const handleChange = (e: any, newValue: any) => {
    e.preventDefault();
    if (isSubmitting || newValue === null) return;
    setPendingValue(newValue);
  };

  return (
    <div className={`flex items-stretch gap-2 ${className}`}>
      <RatingItem
        value={pendingValue ?? value}
        onChange={handleChange}
        disabled={isSubmitting}
        pendingChange={pendingUpdate}
      />
      <Button
        className="flex-1"
        onClick={handleSubmit}
        disabled={!pendingUpdate || isSubmitting}
      >
        {isSubmitting ? "Envoi..." : "Noter"}
      </Button>
    </div>
  );
}
