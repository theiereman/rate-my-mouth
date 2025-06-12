import { Link } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";

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
  const { isCurrentUser } = useUserIsCurrentUser(user);

  return (
    <div className={`flex flex-col ${className}`}>
      <div>
        {prefix && <span className="text-neutral-600">{prefix} </span>}
        <Link
          href={`/users/${user.id}`}
          className={`text-primary-600 hover:underline flex items-center gap-1`}
        >
          {user.username}{" "}
          {isCurrentUser && (
            <span className="text-xs text-neutral-400">(vous)</span>
          )}
        </Link>
      </div>
      <p className="text-xs text-neutral-500">
        {showTitle && user.title && `${user.title}`}
      </p>
    </div>
  );
}
