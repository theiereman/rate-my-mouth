export default function Badge({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <span
      className={`text-primary-900 border-primary-900 border-3 px-2 text-sm font-bold whitespace-nowrap ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
