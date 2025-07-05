type PlaceholderVariant = "primary" | "secondary" | "ghost";

export default function EmptyPlaceholder({
  text,
  subtext,
  variant = "primary",
}: {
  text: string;
  subtext?: string;
  variant?: PlaceholderVariant;
}) {
  const baseClasses = "text-center py-4 px-2 rounded-lg border";
  const variantClasses = {
    primary: "bg-primary-50 border-primary-100 text-primary-500",
    secondary: "bg-secondary-50 border-secondary-100 text-secondary-500",
    ghost: "bg-transparent border-transparent text-neutral-500",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <p className="text-sm">{text}</p>
      <p className="text-xs">{subtext}</p>
    </div>
  );
}
