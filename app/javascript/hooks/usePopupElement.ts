import { useEffect, useRef, useState } from "react";

export function usePopupElement() {
  const ref = useRef<HTMLDivElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!ref.current || isHovered) return;

      //click inside the popup while open
      if (isOpen && ref.current.contains(event.target as Node)) {
        return;
      }

      //click outside of the popup
      if (!ref.current.contains(event.target as Node)) {
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
    ref.current?.addEventListener("mouseover", handleHover);
    ref.current?.addEventListener("mouseout", handleHover);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      ref.current?.removeEventListener("mouseover", handleHover);
      ref.current?.removeEventListener("mouseout", handleHover);
    };
  }, [ref, isHovered, isOpen]);

  return { ref, isOpen };
}
