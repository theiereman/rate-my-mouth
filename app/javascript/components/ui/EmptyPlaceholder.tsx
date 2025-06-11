export default function EmptyPlaceholder({
  text,
  subtext,
  variant = "filled",
}: {
  text: string;
  subtext?: string;
  variant?: "filled" | "outline";
}) {
  const baseClasses = "text-center py-4 px-2 rounded-lg border";
  const variantClasses = {
    filled: "bg-primary-50 border-primary-100",
    outline: "border-neutral-300",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <p className="text-primary-500 text-sm">{text}</p>
      <p className="text-primary-300 text-xs">{subtext}</p>
    </div>
  );
}
