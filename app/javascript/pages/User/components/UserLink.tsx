import { Link } from "@inertiajs/react";
import { UserType } from "../types";

export default function UserLink({ user }: { user: UserType }) {
  return (
    <Link
      href={`/users/${user.id}`}
      className="text-primary-600 hover:underline"
    >
      {user.username}
    </Link>
  );
}
