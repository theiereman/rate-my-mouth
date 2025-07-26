import RatingItem from "./RatingItem";

export default function AverageRatingDisplay({
  value,
  numberOfRatings,
  className,
}: {
  value: number;
  numberOfRatings: number;
  className?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <RatingItem readOnly value={value} />
      <span className="mx-1 text-sm text-neutral-600">
        {`${value.toFixed(1)} sur ${numberOfRatings} avis`}
      </span>
    </div>
  );
}
