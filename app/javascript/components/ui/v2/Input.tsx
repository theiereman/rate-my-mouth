import { InputHTMLAttributes, useId } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({ ...props }: InputProps) {
  const inputId = useId();

  return (
    <div className="flex flex-col">
      {props.label && (
        <label
          htmlFor={inputId}
          className="bg-primary-900 text-background flex px-2 py-0.5 font-bold"
        >
          {props.label}
        </label>
      )}
      <input
        id={inputId}
        className="focus:border-accent-400 border-primary-900 border-3 p-1 ring-0 focus:border-3"
        {...Object.fromEntries(
          Object.entries(props).filter(([key]) => key !== "label"),
        )}
      />
      {props.error && (
        <span className="mt-1 text-sm font-medium text-red-600">
          {props.error}
        </span>
      )}
    </div>
  );
}
