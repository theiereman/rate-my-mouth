import React, { ButtonHTMLAttributes } from "react";
import { Link } from "@inertiajs/react";

type ButtonVariant = "primary" | "secondary" | "accent" | "outline" | "ghost";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
}

interface LinkButtonProps {
  href: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  as?: "a" | "button";
  data?: Record<string, any>;
  preserveScroll?: boolean;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
}

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary-600 hover:bg-primary-700 text-white shadow-sm";
    case "secondary":
      return "bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm";
    case "accent":
      return "bg-accent-600 hover:bg-accent-700 text-white shadow-sm";
    case "outline":
      return "bg-white border border-neutral-300 text-neutral-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50";
    case "ghost":
      return "bg-transparent text-neutral-700 hover:text-neutral-800";
    default:
      return "bg-primary-600 hover:bg-primary-700 text-white shadow-sm";
  }
};

const getSizeClasses = (size: ButtonSize) => {
  switch (size) {
    case "xs":
      return "text-xs px-2 py-1";
    case "sm":
      return "text-sm px-3 py-1.5";
    case "md":
      return "text-sm px-4 py-2";
    case "lg":
      return "text-base px-5 py-2.5";
    case "xl":
      return "text-lg px-6 py-3";
    default:
      return "text-sm px-4 py-2";
  }
};

export const Button = ({
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...props
}: ButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 hover:cursor-pointer";
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {icon && iconPosition === "left" && !isLoading && (
        <span className="mr-2">{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </button>
  );
};

export const LinkButton = ({
  href,
  method = "get",
  as = "a",
  data,
  preserveScroll = false,
  variant = "primary",
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...props
}: LinkButtonProps) => {
  const baseClasses =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass =
    disabled || isLoading ? "opacity-60 cursor-not-allowed" : "";

  if (disabled) {
    return (
      <button
        className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClass} ${className}`}
        disabled
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    );
  }

  return (
    <Link
      href={href}
      method={method}
      as={as}
      data={data}
      preserveScroll={preserveScroll}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${className}`}
      {...props}
    >
      {icon && iconPosition === "left" && <span className="mr-2">{icon}</span>}
      {children}
      {icon && iconPosition === "right" && <span className="ml-2">{icon}</span>}
    </Link>
  );
};

export default Button;
