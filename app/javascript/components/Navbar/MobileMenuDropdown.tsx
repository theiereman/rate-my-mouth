import { LinkButton, Section } from "@components/ui";
import { usePage } from "@inertiajs/react";
import NavbarDropdown, {
  DropdownDirection,
} from "@components/Navbar/NavbarDropdown";
import { NavItem } from "./Navbar";

interface MobileMenuDropdownProps {
  navItems: NavItem[];
  direction?: DropdownDirection;
}

const linkClasses = "w-full justify-center";

export default function MobileMenuDropdown({
  navItems,
  direction,
}: MobileMenuDropdownProps) {
  const { url } = usePage();

  return (
    <NavbarDropdown
      buttonChildren={
        <div className="flex items-center justify-center">
          <span className="material-symbols-outlined">menu</span>
        </div>
      }
      direction={direction}
    >
      <Section title="Menu">
        <div className="space-y-3">
          <LinkButton href="/recipes/new" className="w-full justify-center">
            Nouvelle recette
          </LinkButton>

          {navItems.map((item) => (
            <LinkButton
              key={item.name}
              href={item.href}
              variant="ghost"
              className={`${linkClasses} ${url.startsWith(item.href) ? "font-bold" : "font-light"}`}
            >
              {item.name}
            </LinkButton>
          ))}

          <LinkButton
            variant="ghost"
            href="/my_profile"
            className={`${linkClasses} ${url.startsWith("/my_profile") ? "font-bold" : "font-light"}`}
          >
            Mon profil
          </LinkButton>
        </div>
      </Section>
    </NavbarDropdown>
  );
}
