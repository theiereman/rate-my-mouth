import { Head } from "@inertiajs/react";
import React from "react";

interface PageProps {
  children: React.ReactNode;
  additionnalHeaderContent?: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export default function Page({
  children,
  additionnalHeaderContent,
  title,
  subtitle = "",
  className = "",
}: PageProps) {
  return (
    <main className={`space-y-16 ${className}`}>
      <Head title={title} />

      {title && (
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center xs:items-center">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 font-serif line-clamp-1">
              {title}
            </h1>
            <p className="text-neutral-600">{subtitle}</p>
          </div>

          {additionnalHeaderContent}
        </div>
      )}

      {children}
    </main>
  );
}
