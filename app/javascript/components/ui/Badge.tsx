export default function Badge({
  children,
  className,
  title,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
  onClick?: () => void;
}) {
  return (
    <span
      title={title}
      className={`text-primary-900 border-primary-900 border-3 px-2 text-center text-sm font-bold whitespace-nowrap ${className} ${onClick ? "cursor-pointer" : ""}`}
      onClick={onClick}
    >
      {children}
    </span>
  );
}
