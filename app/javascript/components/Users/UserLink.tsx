import { Link } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";

export default function UserLink({
  user,
  showTitle = false,
  className,
  prefix,
}: {
  user: UserType;
  showTitle?: boolean;
  className?: string;
  prefix?: string;
}) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div>
        {prefix && <span className="text-neutral-600">{prefix} </span>}
        <Link
          href={`/users/${user.id}`}
          className={`text-primary-600 hover:underline`}
        >
          {user.username}
        </Link>
      </div>
      <p className="text-xs text-neutral-500">
        {showTitle && user.title && `${user.title}`}
      </p>
    </div>
  );
}
