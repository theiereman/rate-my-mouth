import { Head } from "@inertiajs/react";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="min-h-screen flex flex-col justify-center bg-background ">
        {children}
      </div>
    </>
  );
}
