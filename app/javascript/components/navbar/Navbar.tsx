import { Link, usePage } from "@inertiajs/react";
import { useState } from "react";
import { LinkButton, UnderlineText } from "@components/ui";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Recettes", href: "/recipes" },
    { name: "Classement", href: "/leaderboard" },
  ];

  const { url } = usePage();

  return (
    <nav className="flex flex-1 font-serif">
      <div className="hidden md:flex">
        {navItems.map((item) =>
          url.startsWith(item.href) ? (
            <UnderlineText offset={6} key={item.name}>
              <LinkButton
                key={item.name}
                href={item.href}
                variant="ghost"
                className="hidden px-4! text-xl transition-transform! hover:scale-105! focus:ring-0! focus:ring-offset-0! md:block"
              >
                {item.name}
              </LinkButton>
            </UnderlineText>
          ) : (
            <LinkButton
              key={item.name}
              href={item.href}
              variant="ghost"
              className="hidden px-4! text-xl transition-transform! hover:scale-105! focus:ring-0! focus:ring-offset-0! md:block"
            >
              {item.name}
            </LinkButton>
          ),
        )}
      </div>

      {/* Mobile navigation button */}
      <div className="md:hidden">
        <button
          type="button"
          className="hover:text-primary-600 flex text-neutral-600"
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
        <div className="animate-slide-in absolute inset-x-0 top-16 z-10 rounded-b-lg bg-white shadow-lg md:hidden">
          <ul className="flex flex-col space-y-3 p-4">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`hover:text-primary-600 block rounded-md px-4 py-2 text-xl text-neutral-600 transition-colors duration-200 hover:bg-neutral-50`}
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
