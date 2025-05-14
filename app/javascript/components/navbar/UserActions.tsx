import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "@customTypes/usepage-props.types";
import UserAvatar from "@components/Users/UserAvatar";

export default function UserActions() {
  const { current_user } = usePage<PageProps>().props;

  return (
    <div className="relative group">
      <button className="flex items-center space-x-3 focus:outline-none cursor-pointer ">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-neutral-700">
            {current_user.username}
          </p>
          <p className="text-xs text-neutral-500">{current_user.email}</p>
        </div>
        <UserAvatar user={current_user} />
      </button>

      <div className="hidden group-hover:block absolute right-0 bg-white rounded-md shadow-lg py-1 z-10">
        <Link
          href="/my_profile"
          className="block w-full px-4 text-end py-2 text-sm text-neutral-600 hover:bg-neutral-100 transition-colors"
        >
          Mon profil
        </Link>
        <Link
          href="/users/sign_out"
          method="delete"
          className="block w-full text-end px-4 py-2 text-sm text-red-600 hover:bg-neutral-100 transition-colors"
        >
          Se déconnecter
        </Link>
      </div>
    </div>
  );
}
