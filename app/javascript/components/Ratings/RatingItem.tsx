import { Badge } from "@components/ui";
import { Rating, RatingProps } from "@mui/material";

function Empty({ className }: { className?: string }) {
  return (
    <div
      className={`border-primary-900 aspect-[1/1] size-6 rounded-full border-5 ${className}`}
    />
  );
}

function Full({ className }: { className?: string }) {
  return (
    <div
      className={`bg-primary-900 aspect-[1/1] size-6 rounded-full ${className}`}
    />
  );
}

export default function RatingItem(
  props: RatingProps & { pendingChange?: boolean },
) {
  return (
    <div className="flex items-center gap-1">
      <Rating
        precision={0.5}
        icon={<Full />}
        emptyIcon={<Empty />}
        className="text-primary-900 gap-0.5"
        {...props}
      />
      <Badge
        className={`w-10 text-center ${props.pendingChange ? "text-accent-500! border-accent-500!" : ""}`}
      >
        {props.value?.toFixed(1) || "0.0"}
      </Badge>
    </div>
  );
}
