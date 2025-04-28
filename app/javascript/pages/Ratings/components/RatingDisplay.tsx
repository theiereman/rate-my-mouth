import { Rating } from "@mui/material";
import { RatingType } from "../types";

export default function RatingDisplay({ rating }: { rating: RatingType }) {
  return (
    <div className="flex flex-col">
      <Rating
        className="MuiRating-alternativeIconFilled"
        precision={0.5}
        value={rating.value}
        readOnly
      />
      <span className="text-sm ms-1 text-gray-500">{rating.user.username}</span>
    </div>
  );
}
