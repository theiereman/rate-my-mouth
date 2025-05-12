import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";
type BadgeSize = "xs" | "sm" | "md" | "lg";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  rounded?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  onClick?: () => void;
}

const getVariantClasses = (variant: BadgeVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary-100 text-primary-800";
    case "secondary":
      return "bg-secondary-100 text-secondary-800";
    case "accent":
      return "bg-accent-100 text-accent-800";
    case "success":
      return "bg-green-100 text-green-800";
    case "warning":
      return "bg-yellow-100 text-yellow-800";
    case "error":
      return "bg-red-100 text-red-800";
    case "info":
      return "bg-blue-100 text-blue-800";
    case "neutral":
      return "bg-neutral-100 text-neutral-800";
    default:
      return "bg-primary-100 text-primary-800";
  }
};

const getSizeClasses = (size: BadgeSize) => {
  switch (size) {
    case "xs":
      return "text-xs px-1.5 py-0.5";
    case "sm":
      return "text-xs px-2 py-0.5";
    case "md":
      return "text-sm px-2.5 py-0.5";
    case "lg":
      return "text-sm px-3 py-1";
    default:
      return "text-xs px-2 py-0.5";
  }
};

export const Badge = ({
  children,
  variant = "primary",
  size = "sm",
  rounded = true,
  icon,
  iconPosition = "left",
  className = "",
  onClick,
}: BadgeProps) => {
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const roundedClasses = rounded ? "rounded-full" : "rounded";
  const cursorClass = onClick ? "cursor-pointer" : "";

  return (
    <span
      className={`flex items-center font-medium whitespace-nowrap ${variantClasses} ${sizeClasses} ${roundedClasses} ${cursorClass} ${className}`}
      onClick={onClick}
    >
      {icon && iconPosition === "left" && <span className="mr-1">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-1">{icon}</span>}
    </span>
  );
};

export default Badge;
