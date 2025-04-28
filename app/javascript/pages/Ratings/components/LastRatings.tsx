import { RatingType } from "../types";
import UserRating from "./RatingDisplay";

export default function LastRatings({
  ratings,
  count = 5,
}: {
  ratings: RatingType[];
  count?: number;
}) {
  return (
    <div id="ratings">
      <h2 className="font-semibold mb-2">Les {count} dernières notes</h2>
      {ratings.length > 0 ? (
        <ul className="flex flex-col gap-2">
          {ratings
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((rating) => (
              <li key={rating.id} className="flex items-center gap-2">
                <UserRating rating={rating} />
              </li>
            ))
            .slice(0, count)}
        </ul>
      ) : (
        <p>Aucune note</p>
      )}
    </div>
  );
}
