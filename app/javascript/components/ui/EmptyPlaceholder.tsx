import React from "react";

export default function EmptyPlaceholder({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-primary-900/60 border-primary-900 flex items-center justify-center py-4 ${className}`}
    >
      {children}
    </div>
  );
}
