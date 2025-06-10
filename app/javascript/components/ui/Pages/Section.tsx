import React from "react";
import UnderlineText, { StrokeVariant } from "../UnderlineText";

export default function Section({
  title,
  underlineStroke,
  icon,
  children,
  rightHeader,
  className = "",
}: {
  title?: string;
  icon?: React.ReactNode;
  rightHeader?: React.ReactNode;
  children?: React.ReactNode;
  underlineStroke?: StrokeVariant;
  className?: string;
}) {
  return (
    <div>
      <div className="flex items-end gap-2 mb-4">
        <UnderlineText
          className={`flex gap-2`}
          stroke={underlineStroke ? underlineStroke : "random"}
          scale={1.5}
          offset={-2}
        >
          {icon && <div className="icon">{icon}</div>}
          {title && <h2 className="font-serif text-2xl">{title}</h2>}
        </UnderlineText>
        {rightHeader && (
          <div className="ml-auto flex items-center">{rightHeader}</div>
        )}
      </div>
      {children && <div className={`${className}`}>{children}</div>}
    </div>
  );
}
