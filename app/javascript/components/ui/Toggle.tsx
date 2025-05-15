import { InputHTMLAttributes } from "react";

interface ToggleProps extends InputHTMLAttributes<HTMLInputElement> {
  checked: boolean;
  label?: string;
  helperText?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Toggle({
  checked,
  label,
  helperText,
  disabled,
  onChange,
  ...props
}: ToggleProps) {
  return (
    <label className="flex flex-col cursor-pointer">
      <div className="flex items-center">
        <input
          {...props}
          checked={checked}
          onChange={onChange}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="relative w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:size-[1.2em] after:transition-all peer-checked:bg-primary-600"></div>
        <span className="ms-3 text-sm text-neutral-800">{label}</span>
      </div>
      {helperText && (
        <span className="text-xs text-neutral-500 mt-1">{helperText}</span>
      )}
    </label>
  );
}
