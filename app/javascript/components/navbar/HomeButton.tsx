import { Link } from "@inertiajs/react";
import logo from "../../assets/images/logo.svg";

export default function HomeButton({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center space-x-2 text-primary-600 font-bold text-xl transition-transform hover:scale-105 ${className}`}
    >
      <img src={logo} className="size-14" />
    </Link>
  );
}
