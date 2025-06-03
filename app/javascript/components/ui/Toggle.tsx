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
    <div className="flex items-center gap-4">
      <input
        {...props}
        onChange={onChange}
        className="rounded border-neutral-300 text-primary-600 focus:ring-primary-500 disabled:opacity-50 cursor-pointer"
        type="checkbox"
      />
      <div className="flex flex-col">
        <span>{label}</span>
        {helperText && (
          <span className="text-xs text-neutral-500 mt-1">{helperText}</span>
        )}
      </div>
    </div>
  );
}
