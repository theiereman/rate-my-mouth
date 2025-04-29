import { Link } from "@inertiajs/react";
import { useState } from "react";
import { LinkButton } from "../ui";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Recettes", href: "/recipes" },
    { name: "Populaires (wip)", href: "#", disabled: true },
    { name: "Nouveautés (wip)", href: "#", disabled: true },
  ];

  return (
    <nav className="flex-1 flex justify-center">
      {/* Desktop navigation */}
      <ul className="hidden md:flex space-x-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`${
                item.disabled ? "opacity-50" : ""
              } text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-primary-600`}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <LinkButton
          href="/recipes/new"
          variant="primary"
          size="sm"
          className="hidden md:block"
        >
          Nouvelle recette
        </LinkButton>
      </ul>

      {/* Mobile navigation button */}
      <div className="md:hidden">
        <button
          type="button"
          className="text-neutral-600 hover:text-primary-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Ouvrir le menu</span>
          {isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 inset-x-0 z-10 bg-white shadow-lg rounded-b-lg animate-slide-in">
          <ul className="flex flex-col p-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`${
                    item.disabled ? "opacity-50" : ""
                  } block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
}
