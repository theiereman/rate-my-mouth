import { useEffect, useRef, useState } from "react";

export function usePopupElement() {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!contentRef.current || isHovered) return;

      //click inside the popup while open
      if (
        isOpen &&
        !buttonRef.current?.contains(event.target as Node) &&
        contentRef.current.contains(event.target as Node)
      ) {
        return;
      }

      //click outside of the popup
      if (!contentRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        return;
      }

      setIsOpen((prev) => !prev);
    };

    const handleHover = (event: MouseEvent) => {
      setIsHovered(event.type === "mouseover");
      setIsOpen(event.type === "mouseover");
    };

    document.addEventListener("mousedown", handleClick);
    contentRef.current?.addEventListener("mouseover", handleHover);
    contentRef.current?.addEventListener("mouseout", handleHover);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      contentRef.current?.removeEventListener("mouseover", handleHover);
      contentRef.current?.removeEventListener("mouseout", handleHover);
    };
  }, [contentRef, buttonRef, isHovered, isOpen]);

  return { contentRef, buttonRef, isOpen };
}
