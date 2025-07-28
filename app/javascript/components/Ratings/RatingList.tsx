import { RatingType } from "@customTypes/rating.types";
import { EmptyPlaceholder } from "@components/ui";
import UserRelatedEventHeader from "@components/Users/UserRelatedEventHeader";
import RatingItem from "./RatingItem";

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
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    )
    .slice(0, count);

  return (
    <div className="flex flex-col gap-4 rounded-lg">
      {sortedRatings.length > 0 ? (
        <ul className="divide-primary-900/20 divide-y">
          {sortedRatings.map((rating) => (
            <li className="py-4" key={rating.id}>
              <UserRelatedEventHeader
                user={rating.user}
                eventTimestamp={rating.created_at}
              />
              <RatingItem readOnly value={rating.value} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPlaceholder>Aucune évaluation pour le moment</EmptyPlaceholder>
      )}
    </div>
  );
}
