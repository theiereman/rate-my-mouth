import { TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  mandatory?: boolean;
  label?: string;
  helperText?: string;
  error?: string;
  variant?: "default" | "filled" | "outlined";
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
  rows?: number;
  "data-1p-ignore"?: boolean;
  "data-lpignore"?: string;
  "data-protonpass-ignore"?: string;
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

export const TextArea = ({
  mandatory = false,
  label = "",
  helperText = "",
  error = "",
  variant = "default",
  className = "",
  containerClassName = "",
  labelClassName = "",
  textareaClassName = "",
  helperTextClassName = "",
  errorClassName = "",
  rows = 5,
  ...props
}: TextAreaProps) => {
  const hasError = !!error;
  const variantClasses = getVariantClasses(variant, hasError);
  const baseTextAreaClasses =
    "block rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 duration-200";

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label
          htmlFor={props.id}
          className={`block text-sm font-medium text-neutral-700 mb-1 ${labelClassName}`}
        >
          {label}
          {mandatory && <span className="text-red-500"> *</span>}
        </label>
      )}
      <textarea
        className={`${baseTextAreaClasses} ${variantClasses} w-full ${textareaClassName}`}
        aria-invalid={hasError}
        aria-describedby={
          props.id ? `${props.id}-helper-text ${props.id}-error` : undefined
        }
        rows={rows}
        {...props}
      />
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

export default TextArea;
