export default function RecipeCategoryContainer({
  title,
  children,
}: {
  title?: string;
  children?: React.ReactNode;
}) {
  const containerStyleClasses = title
    ? "border bg-secondary-50 border-secondary-500 p-2"
    : "border bg-primary-50 border-primary-500 p-2";

  return (
    <div className={`flex flex-col rounded-lg w-full ${containerStyleClasses}`}>
      {title && <h2 className="text-secondary-600 text-sm">{title}</h2>}
      <div className="p-2">{children}</div>
    </div>
  );
}
