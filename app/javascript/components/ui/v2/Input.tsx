import { InputHTMLAttributes, useId } from "react";

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  rightIcon?: React.ReactNode;
};

export default function Input({
  label,
  error,
  className,
  rightIcon,
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
      <div className="relative">
        <input
          id={inputId}
          className={`focus:border-accent-400 border-primary-900 w-full border-3 p-1 ring-0 focus:border-3 ${rightIcon ? "pr-10" : ""} ${className}`}
          {...props}
        />
        {rightIcon && (
          <div className="text-primary-900 absolute top-1/2 right-2 flex -translate-y-1/2 items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && (
        <span className="mt-1 text-sm font-medium text-red-600">{error}</span>
      )}
    </div>
  );
}
