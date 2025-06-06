import React, { useMemo } from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "outlined" | "flat";
  rounded?: "none" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "full";
  hover?: boolean;
  onClick?: () => void;
  ref?: React.Ref<HTMLDivElement>;
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
    case "outlined":
      return "border border-3 border-neutral-300";
    case "flat":
      return "bg-transparent p-0!";
  }
};

export const Card = ({
  children,
  variant = "flat",
  hover = false,
  onClick,
}: CardProps) => {
  const variantClasses = getVariantClasses(variant);
  const hoverClasses = hover
    ? "transition-transform duration-200 hover:scale-[1.01] cursor-pointer"
    : "";

  const getRandomRotation = useMemo(() => {
    const rotation = Math.random();
    return rotation < 0.5 ? rotation * -0.7 : rotation * 0.7;
  }, []);

  return (
    <div className={`group/card relative ${hoverClasses} `}>
      <div
        className={`${
          hover ? "group-hover/card:border-neutral-400" : ""
        } flex flex-col p-5 rounded-lg ${variantClasses} animate-fade-in`}
        onClick={onClick}
        style={
          variant === "outlined"
            ? {
                transform: `rotate(${getRandomRotation}deg)`,
              }
            : undefined
        }
      >
        {children}
      </div>
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
