import { usePage } from "@inertiajs/react";
import { PageProps } from "@customTypes/usepage-props.types";
import UserAvatar from "@components/Users/UserAvatar";
import { LinkButton } from "@components/ui";
import NavbarDropdown from "@components/ui/NavbarDropdown";

export default function UserActionsDropdown() {
  const { current_user } = usePage<PageProps>().props;

  return (
    <NavbarDropdown buttonChildren={<UserAvatar user={current_user} />}>
      <LinkButton
        variant="ghost"
        href="/my_profile"
        className="flex flex-col items-end p-2 hover:bg-neutral-100 transition-colors w-full rounded-none"
      >
        <p
          className="text-sm font-medium text-neutral-700 max-w-full truncate"
          title={current_user.username}
        >
          {current_user.username}
        </p>
        <p
          className="text-xs text-neutral-500 max-w-full truncate"
          title={current_user.email}
        >
          {current_user.email}
        </p>
      </LinkButton>
      <LinkButton
        variant="ghost"
        href="/users/sign_out"
        method="delete"
        className="block w-full rounded-none text-sm text-red-600 hover:text-red-700 hover:bg-red-100 transition-colors"
      >
        Se déconnecter
      </LinkButton>
    </NavbarDropdown>
  );
}
