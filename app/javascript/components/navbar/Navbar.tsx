import { Link } from "@inertiajs/react";
import { useState } from "react";
import { LinkButton } from "../ui";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Recettes", href: "/recipes" },
    // { name: "Populaires (wip)", href: "#", disabled: true },
    // { name: "Nouveautés (wip)", href: "#", disabled: true },
  ];

  return (
    <nav className="flex-1 flex justify-center">
      {/* Desktop navigation */}
      <ul className="hidden md:flex gap-8 items-center">
        {navItems.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={`text-neutral-600 hover:text-primary-600 font-medium transition-colors duration-200 py-2 border-b-2 border-transparent hover:border-primary-600`}
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
            <span className="material-symbols-outlined text-primary-600">
              close
            </span>
          ) : (
            <span className="material-symbols-outlined text-primary-600">
              menu
            </span>
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
