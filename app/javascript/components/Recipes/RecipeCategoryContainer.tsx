export default function RecipeCategoryContainer({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const containerStyleClasses = title
    ? "bg-primary-50 border-primary-500"
    : "border-neutral-300 ";

  return (
    <div
      className={`flex flex-col rounded-lg border-1 p-2 w-full ${containerStyleClasses}`}
    >
      {title && <h2 className="text-primary-600 text-sm">{title}</h2>}
      <div className="p-2">{children}</div>
    </div>
  );
}
