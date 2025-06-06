import React, { ButtonHTMLAttributes } from "react";
import { Link } from "@inertiajs/react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "accent"
  | "gray"
  | "outline"
  | "ghost"
  | "error";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

// Interface commune pour les propriétés partagées
interface CommonButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  children?: React.ReactNode;
}

// Omit 'children' de ButtonHTMLAttributes pour éviter le conflit avec CommonButtonProps
interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children">,
    CommonButtonProps {
  children: React.ReactNode;
}

interface LinkButtonProps extends CommonButtonProps {
  href: string;
  method?: "get" | "post" | "put" | "patch" | "delete";
  data?: Record<string, any>;
  preserveScroll?: boolean;
  preserveState?: boolean;
  onBefore?: () => void;
  onSuccess?: () => void;
  children?: React.ReactNode;
}

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case "primary":
      return "bg-primary-600 hover:bg-primary-700 text-white shadow-sm";
    case "secondary":
      return "bg-secondary-600 hover:bg-secondary-700 text-white shadow-sm";
    case "accent":
      return "bg-accent-600 hover:bg-accent-700 text-white shadow-sm";
    case "gray":
      return "bg-gray-300 hover:bg-gray-400 text-neutral-700 shadow-sm";
    case "outline":
      return "bg-white border border-neutral-300 text-neutral-700 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50";
    case "ghost":
      return "bg-transparent text-neutral-700 hover:text-neutral-800";
    case "error":
      return "bg-error-600 hover:bg-error-700 text-white shadow-sm";
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

const baseClasses =
  "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500";

// Fonction utilitaire pour générer les classes CSS communes - ne nécessite pas children
type ButtonClassesProps = Omit<
  CommonButtonProps,
  "children" | "icon" | "iconPosition"
>;

const getButtonClasses = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  isLoading = false,
  disabled = false,
  className = "",
}: ButtonClassesProps) => {
  const variantClasses = getVariantClasses(variant);
  const sizeClasses = getSizeClasses(size);
  const widthClass = fullWidth ? "w-full" : "";
  const disabledClass = disabled || isLoading ? "opacity-60" : "cursor-pointer";

  return {
    className: `${baseClasses} ${variantClasses} ${sizeClasses} ${widthClass} ${disabledClass} ${className}`,
    isDisabled: disabled || isLoading,
  };
};

// Composant pour rendre le contenu du bouton
const ButtonContent = ({
  icon,
  iconPosition = "left",
  isLoading = false,
  children,
}: Pick<CommonButtonProps, "icon" | "iconPosition" | "isLoading"> & {
  children: React.ReactNode;
}) => (
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
  const { className: buttonClassName, isDisabled } = getButtonClasses({
    variant,
    size,
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
        children={children}
      />
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
  size = "md",
  isLoading = false,
  icon,
  iconPosition = "left",
  fullWidth = false,
  className = "",
  disabled,
  children,
  onBefore,
  onSuccess,
  ...props
}: LinkButtonProps) => {
  const { className: buttonClassName, isDisabled } = getButtonClasses({
    variant,
    size,
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
      {...props}
    >
      <ButtonContent
        icon={icon}
        iconPosition={iconPosition}
        isLoading={isLoading}
        children={children}
      />
    </Link>
  );
};
