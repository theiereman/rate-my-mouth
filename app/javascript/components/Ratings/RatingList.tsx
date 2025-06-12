import { RatingType } from "@customTypes/rating.types";
import RatingItem from "@components/Ratings/RatingItem";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import UserRelatedEventHeader from "@components/Users/UserRelatedEventHeader";

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
      {sortedRatings.length > 0 ? (
        <ul className="divide-y divide-neutral-200">
          {sortedRatings.map((rating) => (
            <li className="py-4" key={rating.id}>
              <UserRelatedEventHeader
                user={rating.user}
                eventTimestamp={rating.created_at}
              />
              <div className="flex items-center text-neutral-800 gap-1">
                A noté cette recette <RatingItem rating={rating} />
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
