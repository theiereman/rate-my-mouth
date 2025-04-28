import { Rating } from "@mui/material";
import { RatingType } from "../types";

export default function RatingDisplay({ rating }: { rating: RatingType }) {
  return (
    <div className="flex flex-col rounded-lg bg-gray-50 border border-gray-200 p-2 w-full">
      <Rating precision={0.5} value={rating.value} readOnly />
      <span className="text-sm ms-2 text-gray-500">{rating.user.username}</span>
    </div>
  );
}
