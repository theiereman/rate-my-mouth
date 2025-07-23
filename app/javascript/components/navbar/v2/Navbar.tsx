import { LinkButton } from "@components/ui";
import { usePage } from "@inertiajs/react";
import UserNotificationsDropdown from "../dropdowns/UserNotificationsDropdown";
import { PageProps } from "@customTypes/usepage-props.types";

const navItems = [
  { name: "Recettes", href: "/recipes" },
  { name: "Classement", href: "/leaderboard" },
];

export default function Navbar() {
  const { url } = usePage();

  const { current_user } = usePage<PageProps>().props;

  return (
    <nav className="divide-primary-900 flex w-full border-1">
      <div className="flex flex-1 divide-x-1">
        <LinkButton href="/recipes/new">Nouv. recette</LinkButton>

        {navItems.map((item) => (
          <LinkButton
            key={item.name}
            href={item.href}
            variant="ghost"
            className={`px-4 text-lg ${url.startsWith(item.href) ? "font-bold" : "font-light"}`}
          >
            {item.name}
          </LinkButton>
        ))}
        <span />
      </div>
      <h1 className="my-auto flex flex-1 justify-center text-xl font-bold uppercase">
        rate my mouth
      </h1>
      <div className="flex flex-1 justify-end divide-x-1">
        <span></span>
        <UserNotificationsDropdown />
        <div className="flex flex-col items-end justify-center gap-0 px-2 py-0.5">
          <p className="font-bold">{current_user.username}</p>
          <LinkButton
            variant="ghost"
            href="/my_profile"
            className="text-xs! font-light normal-case!"
          >
            Mon profil
          </LinkButton>
        </div>
      </div>
    </nav>
  );
}
