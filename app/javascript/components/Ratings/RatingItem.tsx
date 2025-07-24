import { Rating } from "@mui/material";
import { RatingType } from "@customTypes/rating.types";

export default function RatingItem({ rating }: { rating: RatingType }) {
  return (
    <div>
      <div className="bg-primary-900 size-10"></div>
      <Rating
        precision={0.5}
        value={rating.value}
        readOnly
        size="small"
        className="text-primary-500"
      />
    </div>
  );
}
