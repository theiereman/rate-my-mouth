export type RatingSize = "sm" | "md" | "lg";

const getSizeClass = (size?: RatingSize) => {
  switch (size) {
    case "sm":
      return "size-4";
    case "md":
      return "size-6";
    case "lg":
      return "size-8";
    default:
      return "size-6"; // Default size
  }
};

const getBorderClass = (size?: RatingSize) => {
  switch (size) {
    case "sm":
      return "border-4";
    case "md":
      return "border-5";
    case "lg":
      return "border-6";
    default:
      return "border-5"; // Default border size
  }
};

function Empty({ className, size }: { className?: string; size?: RatingSize }) {
  return (
    <div
      className={`border-primary-900 rounded-full ${getBorderClass(size)} ${getSizeClass(size)} ${className}`}
    />
  );
}

function Full({ className, size }: { className?: string; size?: RatingSize }) {
  return (
    <div
      className={`bg-primary-900 ${getSizeClass(size)} rounded-full ${className}`}
    />
  );
}

function Half({ size }: { size?: RatingSize }) {
  return (
    <div className={`relative ${getSizeClass(size)} border-blue-900`}>
      <div className={`relative size-full -translate-x-1/2 overflow-hidden`}>
        <Full className={`absolute left-1/2 size-full`} />
      </div>
      <Empty size={size} className={`absolute top-0 left-0 size-full`} />
    </div>
  );
}

export default function RatingDisplay({
  value,
  size,
}: {
  value: number;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => {
        if (value >= i + 1) {
          return <Full key={i} size={size} />;
        } else if (Math.round(value) >= i + 0.5) {
          return <Half key={i} size={size} />;
        } else {
          return <Empty key={i} size={size} />;
        }
      })}
    </div>
  );
}
