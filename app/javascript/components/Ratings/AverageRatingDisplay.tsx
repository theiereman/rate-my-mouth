import RatingDisplay, { RatingSize } from "./RatingDisplay";

export default function AverageRatingDisplay({
  value,
  numberOfRatings,
  size = "md",
  className,
}: {
  value: number;
  numberOfRatings: number;
  size?: RatingSize;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <RatingDisplay value={value} size={size} />
      <span className="mx-1 text-sm text-neutral-600">
        {`${value.toFixed(1)} sur ${numberOfRatings} avis`}
      </span>
    </div>
  );
}
