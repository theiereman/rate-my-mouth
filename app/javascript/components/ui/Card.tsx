import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "flat";
  padding?: "none" | "sm" | "md" | "lg";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  hover?: boolean;
  onClick?: () => void;
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const getVariantClasses = (variant: string) => {
  switch (variant) {
    case "default":
      return "bg-white shadow-md";
    case "elevated":
      return "bg-white shadow-lg";
    case "outlined":
      return "bg-white border border-neutral-200";
    case "flat":
      return "bg-transparent";
    default:
      return "bg-white shadow-md";
  }
};

const getPaddingClasses = (padding: string) => {
  switch (padding) {
    case "none":
      return "p-0";
    case "sm":
      return "p-3";
    case "md":
      return "p-5";
    case "lg":
      return "p-7";
    default:
      return "p-5";
  }
};

const getRoundedClasses = (rounded: string) => {
  switch (rounded) {
    case "none":
      return "rounded-none";
    case "sm":
      return "rounded-sm";
    case "md":
      return "rounded-md";
    case "lg":
      return "rounded-lg";
    case "xl":
      return "rounded-xl";
    case "2xl":
      return "rounded-2xl";
    case "3xl":
      return "rounded-3xl";
    case "full":
      return "rounded-full";
    default:
      return "rounded-lg";
  }
};

export const Card = ({
  children,
  className = "",
  variant = "default",
  padding = "md",
  rounded = "lg",
  hover = false,
  onClick,
}: CardProps) => {
  const variantClasses = getVariantClasses(variant);
  const paddingClasses = getPaddingClasses(padding);
  const roundedClasses = getRoundedClasses(rounded);
  const hoverClasses = hover
    ? "transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
    : "";

  return (
    <div
      className={`${variantClasses} ${paddingClasses} ${roundedClasses} ${hoverClasses} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }: CardHeaderProps) => {
  return <div className={`mb-4 ${className}`}>{children}</div>;
};

export const CardBody = ({ children, className = "" }: CardBodyProps) => {
  return <div className={className}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }: CardFooterProps) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
