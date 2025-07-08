import { usePage } from "@inertiajs/react";
import { PageProps } from "@customTypes/usepage-props.types";
import UserAvatar from "@components/Users/UserAvatar";
import { LinkButton } from "@components/ui";
import { usePopupElement } from "@hooks/usePopupElement";

export default function UserActions() {
  const { contentRef, buttonRef, isOpen } = usePopupElement();
  const { current_user } = usePage<PageProps>().props;

  return (
    <div ref={contentRef} className="relative group">
      <button
        ref={buttonRef}
        className="flex items-center space-x-3 focus:outline-none cursor-pointer transition-transform group-hover:scale-105"
      >
        <UserAvatar user={current_user} />
      </button>

      <div
        className={`${
          !isOpen ? "hidden" : "block"
        } text-end absolute right-0 bg-white rounded-md shadow-lg z-10 w-64 overflow-hidden`}
      >
        <LinkButton
          variant="ghost"
          href="/my_profile"
          className="flex flex-col items-end px-4 py-2 hover:bg-neutral-100 transition-colors w-full rounded-none"
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
          className="block w-full justify-end rounded-none text-sm text-red-600 hover:text-red-700 hover:bg-red-100 transition-colors"
        >
          Se déconnecter
        </LinkButton>
      </div>
    </div>
  );
}
