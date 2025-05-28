export default function EmptyPlaceholder({
  text,
  subtext,
  variant = "filled",
}: {
  text: string;
  subtext?: string;
  variant?: "filled" | "outline";
}) {
  const baseClasses = "text-center py-4 rounded-lg border";
  const variantClasses = {
    filled: "bg-neutral-50 border-neutral-100",
    outline: "border-neutral-600",
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]}`}>
      <p className="text-neutral-600 text-sm">{text}</p>
      <p className="text-neutral-400 text-xs">{subtext}</p>
    </div>
  );
}
