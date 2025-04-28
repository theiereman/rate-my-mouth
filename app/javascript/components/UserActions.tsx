import { Link, usePage } from "@inertiajs/react";
import { PageProps } from "../types";
import ProfilePicPlaceholder from "./ProfilePicPlaceholder";

export default function UserActions() {
  const { user } = usePage<PageProps>().props;

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col text-sm items-end">
        <span>{user.email}</span>
        <Link
          method="delete"
          className="text-xs text-blue-500 hover:underline hover:cursor-pointer"
          href="/users/sign_out"
        >
          Se déconnecter
        </Link>
      </div>
      <ProfilePicPlaceholder />
    </div>
  );
}
