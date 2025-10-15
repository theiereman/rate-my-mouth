import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Recettes", href: "/recipes" },
  { name: "Classement", href: "/leaderboard" },
];

export default function Navbar() {
  return (
    <>
      <div className="hidden md:block">
        <DesktopNavbar navItems={navItems} />
      </div>
      <div className="block md:hidden">
        <MobileNavbar navItems={navItems} />
      </div>
    </>
  );
}
