import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "../../types";
import ProfilePicPlaceholder from "../ProfilePicPlaceholder";
import { useState, useRef, useEffect } from "react";

export default function UserActions() {
  const { current_user } = usePage<PageProps>().props;
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
        className="flex items-center space-x-3 focus:outline-none cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-neutral-700">
            {current_user.username}
          </p>
          <p className="text-xs text-neutral-500">{current_user.email}</p>
        </div>
        <ProfilePicPlaceholder className="transition-transform hover:scale-105" />
      </button>

      {/* Dropdown menu */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg py-1 z-10">
          {/* User actions */}
          <Link
            href="/my_profile"
            className="block w-full px-4 text-end py-2 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            Mon profil
          </Link>
          <Link
            href="/users/sign_out"
            method="delete"
            className="block w-full text-end px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 transition-colors"
            onClick={() => setIsDropdownOpen(false)}
          >
            Se déconnecter
          </Link>
        </div>
      )}
    </div>
  );
}
