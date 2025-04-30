import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  variant?: "default" | "filled" | "outlined";
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
      } focus:border-blue-500 focus:ring-primary-500 ${errorBorderClass}`;
    case "filled":
      return `bg-neutral-100 border border-transparent focus:bg-white focus:border-blue-500 focus:ring-primary-500 ${errorBorderClass}`;
    case "outlined":
      return `bg-transparent border ${
        hasError ? "border-red-500" : "border-neutral-300"
      } focus:border-blue-500 focus:ring-primary-500 ${errorBorderClass}`;
    default:
      return `bg-white border ${
        hasError ? "border-red-500" : "border-neutral-300"
      } focus:border-blue-500 focus:ring-primary-500 ${errorBorderClass}`;
  }
};

export const Input = ({
  label = "",
  helperText = "",
  error = "",
  leftIcon,
  rightIcon,
  variant = "default",
  className = "",
  containerClassName = "",
  labelClassName = "",
  inputClassName = "",
  helperTextClassName = "",
  errorClassName = "",
  ...props
}: InputProps) => {
  const hasError = !!error;
  const variantClasses = getVariantClasses(variant, hasError);
  const baseInputClasses =
    "block rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200";
  const iconPaddingLeft = leftIcon ? "pl-10" : "";
  const iconPaddingRight = rightIcon ? "pr-10" : "";

  return (
    <div className={`w-full ${containerClassName}`}>
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
          className={`${baseInputClasses} ${variantClasses} ${iconPaddingLeft} ${iconPaddingRight} w-full ${inputClassName}`}
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
};

export default Input;
