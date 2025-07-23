import Navbar from "@components/navbar/v2/Navbar";
import { Layout } from "./Layout";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <div className="bg-background sticky top-0 z-10">
        <Navbar />
      </div>
      <main className="relative flex-grow">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>
    </Layout>
  );
}
