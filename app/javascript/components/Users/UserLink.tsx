import { Link } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";

type UserLinkProps = {
  user: UserType;
  showTitle?: boolean;
  className?: string;
  prefix?: string;
  disabled?: boolean;
};

export default function UserLink({
  user,
  showTitle = false,
  className,
  prefix,
  disabled = false,
}: UserLinkProps) {
  const { isCurrentUser } = useUserIsCurrentUser(user);

  return (
    <div className={`${className} flex flex-col`}>
      <div className="flex items-center gap-1">
        {prefix && <span>{prefix} </span>}
        {disabled ? (
          <span>
            {user.username} {isCurrentUser && <span>(vous)</span>}
          </span>
        ) : (
          <Link
            href={`/users/${user.id}`}
            className={`text-primary-900 font-bold hover:underline`}
          >
            {user.username} {isCurrentUser && <span>(vous)</span>}
          </Link>
        )}
      </div>
      <p className="text-xs text-neutral-500">
        {showTitle && user.title && `${user.title}`}
      </p>
    </div>
  );
}
