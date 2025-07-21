import { usePopupElement } from "@hooks/usePopupElement";

export default function NavbarDropdown({
  children,
  buttonChildren,
}: {
  children: React.ReactNode;
  buttonChildren: React.ReactNode;
}) {
  const { contentRef, buttonRef, isOpen } = usePopupElement();

  return (
    <div ref={contentRef} className="relative group">
      <button
        ref={buttonRef}
        className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center space-x-3 focus:outline-none cursor-pointer transition-transform group-hover:scale-105"
      >
        {buttonChildren}
      </button>

      <div
        className={`${
          !isOpen ? "hidden" : "block"
        } absolute right-0 bg-white rounded-md shadow-lg z-10 w-70 overflow-auto p-4 max-h-90`}
      >
        {children}
      </div>
    </div>
  );
}
