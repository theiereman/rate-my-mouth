import { Link } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";

export default function UserLink({ user }: { user: UserType }) {
  return (
    <Link
      href={`/users/${user.username}`}
      className="text-primary-600 hover:underline"
    >
      {user.username}
    </Link>
  );
}
