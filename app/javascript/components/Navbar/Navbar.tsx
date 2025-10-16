import { useToast } from "@contexts/ToastContext";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import { Toast } from "@components/ui";

export interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "Recettes", href: "/recipes" },
  { name: "Classement", href: "/leaderboard" },
];

export default function Navbar() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="relative">
      {toasts && toasts.length > 0 && (
        <div className="absolute z-50 flex size-full flex-col items-center justify-center">
          <Toast
            key={toasts[0].id}
            message={toasts[0].message}
            onClose={() => removeToast(toasts[0].id)}
          />
        </div>
      )}
      <div className="hidden md:block">
        <DesktopNavbar navItems={navItems} />
      </div>
      <div className="block md:hidden">
        <MobileNavbar navItems={navItems} />
      </div>
    </div>
  );
}
