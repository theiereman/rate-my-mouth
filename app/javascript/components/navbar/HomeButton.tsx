import { Link } from "@inertiajs/react";

export default function HomeButton() {
  return (
    <Link
      href="/"
      className="flex items-center space-x-2 text-primary-600 font-bold text-xl transition-transform hover:scale-105"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-8 h-8"
      >
        <path d="M12 2c-4.97 0-9 4.03-9 9 0 3.12 1.6 5.87 4 7.5V22h2v-2h6v2h2v-3.5c2.4-1.63 4-4.38 4-7.5 0-4.97-4.03-9-9-9zm-4 9c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2-3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm4 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
      </svg>
      <span>RateMyMouth</span>
    </Link>
  );
}
