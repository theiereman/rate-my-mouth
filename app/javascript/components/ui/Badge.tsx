export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "valid"
  | "warning"
  | "error"
  | "neutral"
  | "gray";

type BadgeSize = "xs" | "sm" | "md" | "lg";

interface BadgeProps {
  text: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
}

const backgroundClasses = (variant: BadgeVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary-100 border-primary-300";
    case "secondary":
      return "bg-secondary-100 border-secondary-300";
    case "accent":
      return "bg-accent-100 border-accent-300";
    case "valid":
      return "bg-valid-100 border-valid-300";
    case "warning":
      return "bg-warning-100 border-warning-300";
    case "error":
      return "bg-error-100 border-error-300";
    case "neutral":
      return "bg-neutral-100 border-neutral-300";
    case "gray":
      return "bg-gray-200 border-gray-300";
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
      className={`flex rounded-full justify-center items-center whitespace-nowrap text-neutral-600 border-2 ${backgroundClasses(
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
