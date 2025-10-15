import UserNotificationsDropdown from "./UserNotificationsDropdown";
import MobileMenuDropdown from "./MobileMenuDropdown";
import { NavItem } from "./Navbar";

interface MobileNavbarProps {
  navItems: NavItem[];
}

export default function MobileNavbar({ navItems }: MobileNavbarProps) {
  return (
    <nav className="border-primary-900 flex w-full items-center justify-between border-1 p-3">
      <MobileMenuDropdown navItems={navItems} direction="right" />

      <h1 className="text-primary-900 flex-1 text-center text-lg font-bold uppercase">
        Rate my mouth
      </h1>

      <UserNotificationsDropdown />
    </nav>
  );
}
