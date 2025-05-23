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
    <div className="flex items-center gap-4">
      <label className="relative inline-block items-center h-8 w-14 cursor-pointer rounded-full bg-gray-300 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-primary-600">
        <input
          {...props}
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
          type="checkbox"
        />
        <span
          id="toggle"
          className="absolute inset-y-0 start-0 m-1 size-6 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"
        ></span>
      </label>
      <div className="flex flex-col">
        <span>{label}</span>
        {helperText && (
          <span className="text-xs text-neutral-500 mt-1">{helperText}</span>
        )}
      </div>
    </div>
  );
}
