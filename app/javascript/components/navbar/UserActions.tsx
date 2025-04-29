import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "../../types";
import ProfilePicPlaceholder from "../shared/ProfilePicPlaceholder";
import { useState, useRef, useEffect } from "react";

export default function UserActions() {
  const { user } = usePage<PageProps>().props;
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
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
        className="flex items-center space-x-3 focus:outline-none"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-neutral-700">
            {user.username}
          </p>
          <p className="text-xs text-neutral-500">Mon compte</p>
        </div>
        <ProfilePicPlaceholder className="transition-transform hover:scale-105" />
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fade-in">
          <Link
            href="/profile"
            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            Mon profil
          </Link>
          <Link
            href="/settings"
            className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            Paramètres
          </Link>
          <div className="border-t border-neutral-200 my-1"></div>
          <Link
            href="/users/sign_out"
            method="delete"
            className="block px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            Se déconnecter
          </Link>
        </div>
      )}
    </div>
  );
}
