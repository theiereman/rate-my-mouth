import { TextareaHTMLAttributes, useId } from "react";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  rightIcon?: React.ReactNode;
};

export default function TextArea({
  label,
  className,
  ...props
}: TextAreaProps) {
  const textareaId = useId();

  return (
    <div className="flex size-full flex-col">
      {label && (
        <label
          htmlFor={textareaId}
          className="bg-primary-900 text-background flex px-2 py-0.5 font-bold"
        >
          {label}
        </label>
      )}
      <div className="relative flex-1">
        <textarea
          id={textareaId}
          className={`focus:border-accent-400 border-primary-900 size-full resize-none border-3 p-1 ring-0 focus:border-3 ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
