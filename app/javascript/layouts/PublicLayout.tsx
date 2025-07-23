import { BaseLayout } from "./BaseLayout";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout>
      <div className="h-full p-4">{children}</div>
    </BaseLayout>
  );
}
