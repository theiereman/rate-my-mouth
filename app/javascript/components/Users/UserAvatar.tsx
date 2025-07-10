import { UserType } from "@customTypes/user.types";
import { ReactNode } from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  user: UserType;
  size?: AvatarSize;
  className?: string;
  onClick?: () => void;
  iconOnHover?: ReactNode;
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
  className,
  onClick,
  iconOnHover,
  ...props
}: AvatarProps) => {
  const sizeClasses = getSizeClasses(size);

  return (
    <div
      {...props}
      className={`relative ${className} group ${
        onClick ? "cursor-pointer" : ""
      }`}
    >
      {iconOnHover && (
        <div
          className={`${sizeClasses} absolute top-0 right-0 hidden group-hover:flex cursor-pointer text-primary-600 bg-white opacity-60 z-10 items-center justify-center pointer-events-none`}
        >
          {iconOnHover}
        </div>
      )}

      {user.avatar_url ? (
        <img
          onClick={onClick}
          src={user.avatar_url}
          alt={user.username}
          className={`${sizeClasses} rounded-full object-cover`}
        />
      ) : (
        <div
          className={`${sizeClasses} rounded-full bg-primary-100 text-primary-800 flex items-center justify-center font-medium`}
        >
          {getInitials(user.username)}
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
