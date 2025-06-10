export default function RecipeCategoryContainer({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-lg bg-primary-50 border-1 border-primary-200 p-2 w-full">
      <h2 className="text-neutral-600 text-sm">{title}</h2>
      <div className="p-2">{children}</div>
    </div>
  );
}
