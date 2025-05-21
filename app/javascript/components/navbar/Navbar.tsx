import { Link } from "@inertiajs/react";
import { useState } from "react";
import { LinkButton } from "@components/ui";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Recettes", href: "/recipes" },
    { name: "Classement", href: "/leaderboard" },
  ];

  return (
    <nav className="flex-1 flex">
      <div className="hidden md:flex">
        <LinkButton
          href="/recipes/new"
          variant="primary"
          size="sm"
          className="hidden md:block me-4"
        >
          Nouvelle recette
        </LinkButton>
        {navItems.map((item) => (
          <LinkButton
            key={item.name}
            href={item.href}
            variant="ghost"
            className="hidden md:block"
          >
            {item.name}
          </LinkButton>
        ))}
      </div>

      {/* Mobile navigation button */}
      <div className="md:hidden">
        <button
          type="button"
          className="text-neutral-600 hover:text-primary-600 flex"
          onClick={() => setIsOpen(!isOpen)}
        >
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
                  className={`block px-4 py-2 text-neutral-600 hover:text-primary-600 hover:bg-neutral-50 rounded-md transition-colors duration-200`}
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
