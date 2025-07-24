import React from "react";

export default function EmptyPlaceholder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="text-primary-900/60 border-primary-900 flex items-center justify-center">
      {children}
    </div>
  );
}
