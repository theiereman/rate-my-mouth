import { UserType } from "@customTypes/user.types";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

interface AvatarProps {
  user: UserType;
  size?: AvatarSize;
  status?: AvatarStatus;
  statusPosition?: "top-right" | "bottom-right";
  rounded?: "full" | "lg" | "md" | "sm" | "none";
  className?: string;
  onClick?: () => void;
}

const getSizeClasses = (size: AvatarSize) => {
  switch (size) {
    case "xs":
      return "w-6 h-6 text-xs";
    case "sm":
      return "w-8 h-8 text-sm";
    case "md":
      return "w-10 h-10 text-base";
    case "lg":
      return "w-12 h-12 text-lg";
    case "xl":
      return "w-16 h-16 text-xl";
    case "2xl":
      return "w-20 h-20 text-2xl";
    default:
      return "w-10 h-10 text-base";
  }
};

const getInitials = (name: string) => {
  if (!name) return "";

  const names = name.split(" ");
  if (names.length === 1) {
    return names[0].charAt(0).toUpperCase();
  }

  return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

export const UserAvatar = ({
  user,
  size = "md",
  className = "",
  onClick,
}: AvatarProps) => {
  const sizeClasses = getSizeClasses(size);
  const cursorClass = onClick ? "cursor-pointer" : "";

  console.log("Avatar component rendered with user:", user);

  return (
    <div className={`relative ${className} group`} onClick={onClick}>
      {onClick && (
        <div
          className={`${sizeClasses} absolute top-0 right-0 hidden group-hover:flex cursor-pointer text-primary-600 bg-white opacity-60 z-10 items-center justify-center`}
        >
          <span className="material-symbols-outlined">edit</span>
        </div>
      )}
      {user.avatar_url ? (
        <img
          src={user.avatar_url}
          alt={user.username}
          className={`${sizeClasses} ${cursorClass} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${sizeClasses} ${cursorClass} rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-medium`}
        >
          {getInitials(user.username)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
