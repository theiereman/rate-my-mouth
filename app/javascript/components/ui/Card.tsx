import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "outlined" | "flat";
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

export const Card = ({
  children,
  className = "",
  variant = "outlined",
  hover = false,
  onClick,
}: CardProps) => {
  const variantClasses = getVariantClasses(variant);
  const hoverClasses = hover
    ? "transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
    : "";

  return (
    <div
      className={`p-5 rounded-lg ${variantClasses} ${hoverClasses} ${className} animate-fade-in`}
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
  return <div className={`size-full ${className}`}>{children}</div>;
};

export const CardFooter = ({ children, className = "" }: CardFooterProps) => {
  return <div className={`mt-4 ${className}`}>{children}</div>;
};

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;
