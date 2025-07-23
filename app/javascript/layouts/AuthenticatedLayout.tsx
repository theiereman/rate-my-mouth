import Navbar from "@components/navbar/v2/Navbar";
import { BaseLayout } from "./BaseLayout";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <BaseLayout>
      <div className="bg-background sticky top-0 z-10 mx-4 my-2">
        <Navbar />
      </div>
      <main className="relative flex-grow">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </BaseLayout>
  );
}
