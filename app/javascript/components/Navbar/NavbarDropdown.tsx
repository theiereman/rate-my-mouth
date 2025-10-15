import { usePopupElement } from "@hooks/usePopupElement";
import { Button } from "@components/ui";

export type DropdownDirection = "left" | "right";

export default function NavbarDropdown({
  children,
  buttonChildren,
  direction = "left",
}: {
  children: React.ReactNode;
  buttonChildren: React.ReactNode;
  direction?: DropdownDirection;
}) {
  const { contentRef, buttonRef, isOpen } = usePopupElement();

  return (
    <div ref={contentRef} className="group relative">
      <Button
        variant="ghost"
        ref={buttonRef}
        className="h-full cursor-pointer px-2 focus:outline-none"
      >
        {buttonChildren}
      </Button>

      <div
        className={`${
          !isOpen ? "hidden" : "block"
        } bg-background absolute ${direction == "left" ? "-right-0.5" : "-left-0.5"} z-10 w-70 overflow-auto border-2 shadow-lg`}
      >
        {children}
      </div>
    </div>
  );
}
