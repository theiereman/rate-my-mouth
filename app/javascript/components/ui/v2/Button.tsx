import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
};

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case "default":
      return "bg-primary-900 text-background px-4 py-2 font-bold hover:bg-primary-800 hover:text-white";
    case "ghost":
      return "bg-transparent text-primary-900 p-0 font-black hover:text-primary-800 hover:fill-primary-800";
  }
};

export default function Button({
  variant = "default",
  children,
  className,
  ref,
  ...props
}: ButtonProps) {
  return (
    <button
      ref={ref}
      className={`${props.disabled ? "cursor-default opacity-60" : ""} ${getVariantClasses(variant)} flex cursor-pointer items-center justify-center uppercase transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
