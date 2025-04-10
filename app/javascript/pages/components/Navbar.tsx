export default function Navbar() {
  return (
    <nav>
      <ul className="flex space-x-4">
        <li>
          <a href="/recipes" className="text-blue-500 hover:underline">
            Toutes les recettes
          </a>
        </li>
      </ul>
    </nav>
  );
}
