import { Rating } from "@mui/material";
import { RatingType } from "@customTypes/rating.types";

export default function RatingItem({ rating }: { rating: RatingType }) {
  return (
    <>
      <Rating
        precision={0.5}
        value={rating.value}
        readOnly
        size="small"
        className="text-primary-500"
      />
    </>
  );
}
