import { useToast } from "@contexts/ToastContext";
import { usePage } from "@inertiajs/react";
import { useEffect, useRef } from "react";
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
  const { toasts, removeToast, showToast } = useToast();
  const { flash } = usePage().props as any;
  const flashShownRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (flash) {
      const flashKeys = Object.keys(flash);
      flashKeys.forEach((key) => {
        const message = flash[key];
        if (message && !flashShownRef.current.has(message)) {
          flashShownRef.current.add(message);
          const type =
            key === "notice" ? "success" : key === "alert" ? "error" : "info";
          showToast(message, { type });
          // Allow re-display after 5 seconds
          setTimeout(() => {
            flashShownRef.current.delete(message);
          }, 5000);
        }
      });
    }
  }, [flash, showToast]);

  return (
    <div className="relative">
      {toasts && toasts.length > 0 && (
        <div className="absolute z-50 flex size-full flex-col items-center justify-center">
          <Toast
            key={toasts[0].id}
            message={toasts[0].message}
            duration={toasts[0].duration}
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
