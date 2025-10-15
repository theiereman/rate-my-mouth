import { InputHTMLAttributes } from "react";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Toggle({
  label,
  helperText,
  onChange,
  ...props
}: ToggleProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex gap-4 items-center">
        <input
          {...props}
          onChange={onChange}
          className="text-primary-600 focus:ring-primary-500 cursor-pointer rounded border-neutral-300 disabled:opacity-50"
          type="checkbox"
        />
        <span>{label}</span>
      </div>
      {helperText && (
        <span className="ml-8 text-xs text-neutral-500">{helperText}</span>
      )}
    </div>
  );
}
