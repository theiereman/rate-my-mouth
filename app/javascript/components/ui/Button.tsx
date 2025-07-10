import React, { ButtonHTMLAttributes } from "react";
import { Link } from "@inertiajs/react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "gray"
  | "outline"
  | "ghost"
  | "ghost-primary"
  | "error";

// Interface commune pour les propriétés partagées
interface CommonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
}

interface LinkButtonProps extends CommonButtonProps {
  href: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  data?: Record<string, any>;
  preserveScroll?: boolean;
  preserveState?: boolean;
  onBefore?: () => void;
  onSuccess?: () => void;
}

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary-600 enabled:hover:bg-primary-700 text-white";
    case "secondary":
      return "bg-secondary-600 enabled:hover:bg-secondary-700 text-white";
    case "accent":
      return "bg-accent-600 enabled:hover:bg-accent-700 text-white";
    case "gray":
      return "bg-gray-300 enabled:hover:bg-gray-400 text-neutral-700";
    case "outline":
      return "bg-white border border-neutral-300 text-neutral-700 enabled:hover:border-primary-500 enabled:hover:text-primary-600 enabled:hover:bg-primary-50";
    case "ghost":
      return "bg-transparent text-neutral-700";
    case "ghost-primary":
      return "bg-transparent text-neutral-700 enabled:hover:text-primary-500";
    case "error":
      return "bg-error-600 enabled:hover:bg-error-700 text-white";
    default:
      return "bg-primary-600 enabled:hover:bg-primary-700 text-white";
  }
};

const baseClasses = `p-2 px-3 inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`;

const getButtonClasses = ({
  variant = "primary",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = "",
}: CommonButtonProps) => {
  const variantClasses = getVariantClasses(variant);
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled || isLoading ? "opacity-50" : "cursor-pointer";

  return {
    className: `${baseClasses} ${variantClasses} ${widthClass} ${disabledClass} ${className}`,
    isDisabled: disabled || isLoading,
  };
};

// Composant pour rendre le contenu du bouton
const ButtonContent = ({
  icon,
  iconPosition = "left",
  isLoading = false,
  children,
}: CommonButtonProps) => (
  <>
    {icon &&
      iconPosition === "left" &&
      (isLoading ? (
        <span
          className={`material-symbols-outlined text-white-600 animate-spin ${
            children ? "mr-2" : ""
          }`}
        >
          progress_activity
        </span>
      ) : (
        <span className={`${children ? "mr-2" : ""} flex`}>{icon}</span>
      ))}
    {children}
    {icon &&
      iconPosition === "right" &&
      (isLoading ? (
        <span
          className={`material-symbols-outlined text-white-600 animate-spin ${
            children ? "ml-2" : ""
          }`}
        >
          progress_activity
        </span>
      ) : (
        <span className="ml-2 flex">{icon}</span>
      ))}
  </>
);

export const Button = ({
  variant = "primary",
  isLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  children,
  ...props
}: CommonButtonProps) => {
  const { className: buttonClassName, isDisabled } = getButtonClasses({
    variant,
    fullWidth,
    isLoading,
    disabled,
    className,
  });

  return (
    <button className={buttonClassName} disabled={isDisabled} {...props}>
      <ButtonContent
        icon={icon}
        iconPosition={iconPosition}
        isLoading={isLoading}
      />
      {children}
    </button>
  );
};

export const LinkButton = ({
  href,
  method = "get",
  data,
  preserveScroll = false,
  preserveState = false,
  variant = "primary",
  isLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  onBefore,
  onSuccess,
  ...props
}: LinkButtonProps) => {
  const { className: buttonClassName, isDisabled } = getButtonClasses({
    variant,
    fullWidth,
    isLoading,
    disabled,
    className,
  });

  return (
    <Link
      href={href}
      method={method}
      as="button"
      data={data}
      preserveScroll={preserveScroll}
      preserveState={preserveState}
      onBefore={onBefore}
      onSuccess={onSuccess}
      className={buttonClassName}
      disabled={isDisabled}
    >
      <ButtonContent
        icon={icon}
        iconPosition={iconPosition}
        isLoading={isLoading}
        {...props}
      />
    </Link>
  );
};
