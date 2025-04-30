import React, { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  variant?: "default" | "filled" | "outlined";
  className?: string;
  containerClassName?: string;
  labelClassName?: string;
  textareaClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
  rows?: number;
  autoResize?: boolean;
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

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      variant = "default",
      className = "",
      containerClassName = "",
      labelClassName = "",
      textareaClassName = "",
      helperTextClassName = "",
      errorClassName = "",
      rows = 4,
      autoResize = false,
      ...props
    },
    ref
  ) => {
    const hasError = !!error;
    const variantClasses = getVariantClasses(variant, hasError);
    const widthClass = fullWidth ? "w-full" : "";
    const baseTextareaClasses =
      "block rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-colors duration-200 px-4 py-2";

    const handleAutoResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize) {
        e.target.style.height = "auto";
        e.target.style.height = `${e.target.scrollHeight}px`;
      }
    };

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
        <textarea
          ref={ref}
          rows={rows}
          className={`${baseTextareaClasses} ${variantClasses} ${widthClass} ${textareaClassName}`}
          aria-invalid={hasError}
          aria-describedby={
            props.id ? `${props.id}-helper-text ${props.id}-error` : undefined
          }
          onChange={(e) => {
            handleAutoResize(e);
            props.onChange && props.onChange(e);
          }}
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
  }
);

Textarea.displayName = "Textarea";

export default Textarea;
