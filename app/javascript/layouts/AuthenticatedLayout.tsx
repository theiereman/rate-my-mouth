import Navbar from "@components/Navbar/Navbar";
import { BaseLayout } from "./BaseLayout";
import { useEffect, useState } from "react";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 0);
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <BaseLayout>
      <div
        className={`bg-background sticky top-0 z-10 transition-all ${!isScrolled ? "mx-4 my-2" : "shadow-md"}`}
      >
        <Navbar />
      </div>
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </div>
    </BaseLayout>
  );
}
