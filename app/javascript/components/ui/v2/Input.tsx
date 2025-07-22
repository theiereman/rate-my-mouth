import { InputHTMLAttributes, useId } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export default function Input({
  label,
  value,
  error,
  className,
  onChange,
  ...props
}: InputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col">
      {label && (
        <label
          htmlFor={inputId}
          className="bg-primary-900 text-background flex px-2 py-0.5 font-bold"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`focus:border-accent-400 border-primary-900 border-3 p-1 ring-0 focus:border-3 ${className}`}
        {...props}
      />
      {error && (
        <span className="mt-1 text-sm font-medium text-red-600">{error}</span>
      )}
    </div>
  );
}
