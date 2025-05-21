import { usePage } from "@inertiajs/react";
import { PageProps } from "@customTypes/usepage-props.types";
import UserAvatar from "@components/Users/UserAvatar";
import { LinkButton } from "@components/ui";

export default function UserActions() {
  const { current_user } = usePage<PageProps>().props;

  return (
    <div className="relative group">
      <button className="flex items-center space-x-3 focus:outline-none cursor-pointer transition-transform group-hover:scale-105">
        <UserAvatar user={current_user} />
      </button>

      <div className="hidden text-end group-hover:block absolute right-0 bg-white rounded-md shadow-lg z-10">
        <div className="px-4 py-2">
          <p className="text-sm font-medium text-neutral-700">
            {current_user.username}
          </p>
          <p className="text-xs text-neutral-500">{current_user.email}</p>
        </div>
        <LinkButton
          variant="ghost"
          href="/my_profile"
          className="block w-full justify-end rounded-none text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          Mon profil
        </LinkButton>
        <LinkButton
          variant="ghost"
          href="/users/sign_out"
          method="delete"
          className="block w-full justify-end rounded-none text-sm text-red-600 hover:text-red-700 hover:bg-red-100 transition-colors"
        >
          Se déconnecter
        </LinkButton>
      </div>
    </div>
  );
}
