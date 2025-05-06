import { useEffect, useRef, useState } from "react";
import CustomThemeSelector from "./CustomThemeSelector";
import PredefinedThemeSelector from "./PredefinedThemeSelector";

export default function ThemeSelector() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center space-x-3 focus:outline-none cursor-pointer transition-transform hover:scale-105"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span className="material-symbols-outlined text-primary-600">
          color_lens
        </span>
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg z-10 py-2 px-4 flex flex-col gap-2">
          <div id="predefined-colors">
            <h1 className="text-sm font-medium text-neutral-700 mb-2">
              Thème de l'application
            </h1>
            <PredefinedThemeSelector />
          </div>

          <div id="custom-colors">
            <CustomThemeSelector />
          </div>
        </div>
      )}
    </div>
  );
}
