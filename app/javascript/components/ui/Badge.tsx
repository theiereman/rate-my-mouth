import React, { useMemo } from "react";

import badge1 from "../../assets/images/badge_1.svg";
import badge2 from "../../assets/images/badge_2.svg";
import badge3 from "../../assets/images/badge_3.svg";

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

const badgeBackgrounds = {
  1: badge1,
  2: badge2,
  3: badge3,
};

const getRandomBackground = () => {
  const backgroundNumbers = [1, 2, 3] as const;
  return backgroundNumbers[
    Math.floor(Math.random() * backgroundNumbers.length)
  ];
};

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

const getBadgeBackgroundClasses = (variant: BadgeVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary-500";
    case "secondary":
      return "bg-secondary-500";
    case "accent":
      return "bg-accent-500";
    case "success":
      return "bg-valid-500";
    case "warning":
      return "bg-warning-500";
    case "error":
      return "bg-error-500";
    case "info":
      return "bg-blue-500";
    case "neutral":
      return "bg-neutral-400";
    default:
      return "bg-primary-500";
  }
};

export const Badge = ({
  text,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  className = "",
  onClick,
}: BadgeProps) => {
  const selectedBackground = useMemo(() => {
    return getRandomBackground();
  }, []);

  const backgroundClasses = getBadgeBackgroundClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const cursorClass = onClick ? "cursor-pointer" : "";

  const backgroundStyle = {
    mask: `url(${badgeBackgrounds[selectedBackground]}) no-repeat center`,
    WebkitMask: `url(${badgeBackgrounds[selectedBackground]}) no-repeat center`,
    maskSize: "contain",
    WebkitMaskSize: "contain",
    opacity: 0.5,
  };

  return (
    <span
      className={`relative flex justify-center items-center whitespace-nowrap ${sizeClasses}${cursorClass} ${className}`}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 ${backgroundClasses}`}
        style={backgroundStyle}
        aria-hidden="true"
      />
      <span className={`relative flex items-center text-black`}>
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
