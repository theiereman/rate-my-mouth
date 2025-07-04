export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "valid"
  | "warning"
  | "error"
  | "neutral"
  | "gray"
  | "ghost";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
}

const backgroundClasses = (variant: BadgeVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary-100 border-primary-500";
    case "secondary":
      return "bg-secondary-100 border-secondary-500";
    case "accent":
      return "bg-accent-100 border-accent-500";
    case "valid":
      return "bg-valid-100 border-valid-500";
    case "warning":
      return "bg-warning-100 border-warning-500";
    case "error":
      return "bg-error-100 border-error-500";
    case "neutral":
      return "bg-neutral-100 border-neutral-500";
    case "gray":
      return "bg-gray-200 border-gray-300";
    case "ghost":
      return "";
    default:
      return "";
  }
};

export const Badge = ({
  text,
  variant = "primary",
  icon,
  iconPosition = "left",
  className = "",
  onClick,
}: BadgeProps) => {
  const cursorClass = onClick ? "cursor-pointer" : "";

  return (
    <span
      className={`flex rounded-full justify-center items-center whitespace-nowrap text-neutral-600 border-1 ${backgroundClasses(
        variant
      )} text-sm px-2 ${cursorClass} ${className}`}
      onClick={onClick}
    >
      <span className={`flex items-center`}>
        {icon && iconPosition === "left" && (
          <div className="mr-1 flex align-center">{icon}</div>
        )}
        <span className="font-black">{text}</span>
        {icon && iconPosition === "right" && (
          <div className="ml-1 flex align-center">{icon}</div>
        )}
      </span>
    </span>
  );
};

export default Badge;
