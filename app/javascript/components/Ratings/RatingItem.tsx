import { Rating } from "@mui/material";
import { RatingType } from "@customTypes/rating.types";
import { formatDate } from "@helpers/date-helper";

export default function RatingItem({ rating }: { rating: RatingType }) {
  return (
    <div className="mt-1">
      <Rating
        precision={0.5}
        value={rating.value}
        readOnly
        size="small"
        className="text-primary-500"
      />
      <div className="text-xs text-neutral-500 mt-1">
        {formatDate(rating.created_at)}
      </div>
    </div>
  );
}
