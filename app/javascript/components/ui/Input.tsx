import React, { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
  variant?: "default" | "filled" | "outlined";
  size?: "sm" | "md" | "lg";
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
}

const getVariantClasses = (variant: string, hasError: boolean) => {
  const errorBorderClass = hasError
    ? "border-red-500 focus:border-red-500 focus:ring-red-500"
    : "";

  switch (variant) {
    case "default":
      return `bg-white border ${
        hasError ? "border-red-500" : "border-neutral-300"
      } focus:border-blue-500 focus:ring-blue-500 ${errorBorderClass}`;
    case "filled":
      return `bg-neutral-100 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-blue-500 ${errorBorderClass}`;
    case "outlined":
      return `bg-transparent border ${
        hasError ? "border-red-500" : "border-neutral-300"
      } focus:border-blue-500 focus:ring-blue-500 ${errorBorderClass}`;
    default:
      return `bg-white border ${
        hasError ? "border-red-500" : "border-neutral-300"
      } focus:border-blue-500 focus:ring-blue-500 ${errorBorderClass}`;
  }
};

const getSizeClasses = (size: string) => {
  switch (size) {
    case "sm":
      return "px-3 py-1.5 text-sm";
    case "md":
      return "px-4 py-2 text-base";
    case "lg":
      return "px-5 py-2.5 text-lg";
    default:
      return "px-4 py-2 text-base";
  }
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      fullWidth = false,
      variant = "default",
      size = "md",
      className = "",
      containerClassName = "",
      labelClassName = "",
      inputClassName = "",
      helperTextClassName = "",
      errorClassName = "",
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const variantClasses = getVariantClasses(variant, hasError);
    const sizeClasses = getSizeClasses(size);
    const widthClass = fullWidth ? "w-full" : "";
    const baseInputClasses =
      "block rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200";
    const iconPaddingLeft = leftIcon ? "pl-10" : "";
    const iconPaddingRight = rightIcon ? "pr-10" : "";

    return (
      <div className={`${widthClass} ${containerClassName}`}>
        {label && (
          <label
            htmlFor={props.id}
            className={`block text-sm font-medium text-neutral-700 mb-1 ${labelClassName}`}
          >
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-neutral-500">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseInputClasses} ${variantClasses} ${sizeClasses} ${iconPaddingLeft} ${iconPaddingRight} ${widthClass} ${inputClassName}`}
            aria-invalid={hasError}
            aria-describedby={
              props.id ? `${props.id}-helper-text ${props.id}-error` : undefined
            }
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
              {rightIcon}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p
            id={props.id ? `${props.id}-helper-text` : undefined}
            className={`mt-1 text-sm text-neutral-500 ${helperTextClassName}`}
          >
            {helperText}
          </p>
        )}
        {error && (
          <p
            id={props.id ? `${props.id}-error` : undefined}
            className={`mt-1 text-sm text-red-600 ${errorClassName}`}
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
