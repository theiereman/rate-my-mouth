import { Link } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";

export default function UserLink({
  user,
  showTitle = false,
  className,
}: {
  user: UserType;
  showTitle?: boolean;
  className?: string;
}) {
  return (
    <>
      <Link
        href={`/users/${user.id}`}
        className={`${className} text-primary-600 hover:underline flex flex-col`}
      >
        {user.username}
        <span className="text-xs text-neutral-500">
          {showTitle && user.title && `${user.title}`}
        </span>
      </Link>
    </>
  );
}
