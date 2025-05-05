import { Link } from "@inertiajs/react";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-primary-600 font-bold text-xl transition-transform hover:scale-105"
    >
      <span className="material-symbols-outlined text-primary-600">
        chef_hat
      </span>
      <span>RateMyMouth</span>
    </Link>
  );
}
