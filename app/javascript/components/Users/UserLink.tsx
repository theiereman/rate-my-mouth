import { Link } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";

export default function UserLink({
  user,
  className,
}: {
  user: UserType;
  className?: string;
}) {
  return (
    <Link
      href={`/users/${user.id}`}
      className={`${className} text-primary-600 hover:underline`}
    >
      {user.username}
    </Link>
  );
}
