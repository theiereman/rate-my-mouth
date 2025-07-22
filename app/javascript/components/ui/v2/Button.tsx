import { ButtonHTMLAttributes } from "react";

type ButtonVariant = "default" | "ghost";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: React.ReactNode;
};

const getVariantClasses = (variant: ButtonVariant) => {
  switch (variant) {
    case "default":
      return "bg-primary-900 text-background px-4 py-2 font-bold hover:bg-primary-800 hover:text-white";
    case "ghost":
      return "bg-transparent text-primary-900 p-0 font-black hover:text-primary-800";
  }
};

export default function Button({
  variant = "default",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${className} ${props.disabled ? "opacity-60 cursor-default" : "" } ${getVariantClasses(variant)} cursor-pointer uppercase transition-colors`}
      {...props}
    >
      {children}
    </button>
  );
}
