import { Head } from "@inertiajs/react";
import React from "react";

interface PageProps {
  children: React.ReactNode;
  additionnalHeaderContent?: React.ReactNode;
  title: string;
  subtitle: string;
}

export default function Page({
  children,
  additionnalHeaderContent,
  title,
  subtitle,
}: PageProps) {
  return (
    <>
      <Head title={title} />

      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 font-serif">
            {title}
          </h1>
          <p className="text-neutral-600">{subtitle}</p>
        </div>

        {additionnalHeaderContent}
      </div>

      {children}
    </>
  );
}
