import React from "react";
import UnderlineText, { StrokeVariant } from "../UnderlineText";

export default function Section({
  title,
  underlineStroke,
  icon,
  children,
  rightHeader,
  childrenClassName = "",
  containerClassName = "",
}: {
  title?: string;
  icon?: React.ReactNode;
  rightHeader?: React.ReactNode;
  children?: React.ReactNode;
  underlineStroke?: StrokeVariant;
  childrenClassName?: string;
  containerClassName?: string;
}) {
  return (
    <div className={containerClassName}>
      <div className="flex items-end gap-2 mb-4">
        <UnderlineText
          className={`flex gap-2`}
          stroke={underlineStroke ? underlineStroke : "random"}
          scale={1.4}
          offset={-2}
        >
          {icon && <div className="icon">{icon}</div>}
          {title && <h2 className="font-serif text-2xl">{title}</h2>}
        </UnderlineText>
        {rightHeader && (
          <div className="ml-auto flex items-center">{rightHeader}</div>
        )}
      </div>
      {children && (
        <div className={`space-y-4 ${childrenClassName}`}>{children}</div>
      )}
    </div>
  );
}
