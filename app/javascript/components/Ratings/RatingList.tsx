import { RatingType } from "@customTypes/rating.types";
import RatingItem from "@components/Ratings/RatingItem";
import UserAvatar from "@components/Users/UserAvatar";
import { formatDateTime } from "@helpers/date-helper";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";

export default function RatingList({
  ratings,
  count = 3,
}: {
  ratings: RatingType[];
  count?: number;
}) {
  const sortedRatings = [...ratings]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, count);

  return (
    <div className="flex flex-col gap-4 rounded-lg">
      <h3 className="text-neutral-800">Les {count} dernières évaluations</h3>

      {sortedRatings.length > 0 ? (
        <ul className="space-y-4">
          {sortedRatings.map((rating) => (
            <li key={rating.id} className="flex items-start gap-3">
              <UserAvatar
                user={rating.user}
                size="md"
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex sm:flex-row items-center gap-1 mb-1">
                  <span className="font-medium text-sm text-neutral-800">
                    {rating.user.username}
                  </span>
                  <span className="text-xs text-neutral-500">
                    {formatDateTime(rating.created_at)}
                  </span>
                </div>
                <RatingItem rating={rating} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPlaceholder text="Aucune évaluation pour le moment" />
      )}
    </div>
  );
}
