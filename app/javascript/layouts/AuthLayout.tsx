import { Head } from "@inertiajs/react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <main className="flex flex-col justify-center min-h-screen bg-background">
      <Head>
        <title>{title}</title>
      </Head>
      <div className="w-[300px] mx-auto">{children}</div>
    </main>
  );
}
