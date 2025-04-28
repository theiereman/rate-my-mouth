import { Link } from "@inertiajs/react";

export default function Navbar() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <Link href="/recipes" className="text-blue-500 hover:underline">
            Toutes les recettes
          </Link>
        </li>
      </ul>
    </nav>
  );
}
