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
        <div className="xs:items-center flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 uppercase">
              {title}
            </h1>
            <p className="text-primary-900/60 font-light">{subtitle}</p>
          </div>

          {additionnalHeaderContent}
        </div>
      )}

      {children}
    </main>
  );
}
