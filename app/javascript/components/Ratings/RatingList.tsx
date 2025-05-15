import { RatingType } from "@customTypes/rating.types";
import RatingItem from "@components/Ratings/RatingItem";
import UserAvatar from "@components/Users/UserAvatar";
import { formatDateTime } from "@helpers/date-helper";

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
    <div>
      <h3 className="font-medium text-neutral-800 mb-3">
        Les {count} dernières évaluations
      </h3>

      {sortedRatings.length > 0 ? (
        <ul className="space-y-4">
          {sortedRatings.map((rating) => (
            <li key={rating.id} className="flex items-start gap-3">
              <UserAvatar
                name={rating.user.username}
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
        <div className="text-center py-4 bg-neutral-50 rounded-lg border border-neutral-100">
          <p className="text-sm text-neutral-600">
            Aucune évaluation pour le moment
          </p>
        </div>
      )}
    </div>
  );
}
