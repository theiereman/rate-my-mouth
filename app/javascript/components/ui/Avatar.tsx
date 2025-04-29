import React from "react";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
type AvatarStatus = "online" | "offline" | "away" | "busy" | "none";

interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
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

const getStatusClasses = (status: AvatarStatus) => {
  switch (status) {
    case "online":
      return "bg-green-500";
    case "offline":
      return "bg-neutral-400";
    case "away":
      return "bg-yellow-500";
    case "busy":
      return "bg-red-500";
    case "none":
      return "hidden";
    default:
      return "hidden";
  }
};

const getStatusSizeClasses = (size: AvatarSize) => {
  switch (size) {
    case "xs":
      return "w-1.5 h-1.5";
    case "sm":
      return "w-2 h-2";
    case "md":
      return "w-2.5 h-2.5";
    case "lg":
      return "w-3 h-3";
    case "xl":
      return "w-3.5 h-3.5";
    case "2xl":
      return "w-4 h-4";
    default:
      return "w-2.5 h-2.5";
  }
};

const getRoundedClasses = (rounded: string) => {
  switch (rounded) {
    case "full":
      return "rounded-full";
    case "lg":
      return "rounded-lg";
    case "md":
      return "rounded-md";
    case "sm":
      return "rounded-sm";
    case "none":
      return "rounded-none";
    default:
      return "rounded-full";
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

export const Avatar = ({
  src,
  alt = "",
  name = "",
  size = "md",
  status = "none",
  statusPosition = "bottom-right",
  rounded = "full",
  className = "",
  onClick,
}: AvatarProps) => {
  const sizeClasses = getSizeClasses(size);
  const statusClasses = getStatusClasses(status);
  const statusSizeClasses = getStatusSizeClasses(size);
  const roundedClasses = getRoundedClasses(rounded);
  const cursorClass = onClick ? "cursor-pointer" : "";
  
  const statusPositionClasses = {
    "top-right": "top-0 right-0 transform translate-x-1/4 -translate-y-1/4",
    "bottom-right": "bottom-0 right-0 transform translate-x-1/4 translate-y-1/4",
  };

  return (
    <div className={`relative inline-block ${className}`} onClick={onClick}>
      {src ? (
        <img
          src={src}
          alt={alt || name}
          className={`${sizeClasses} ${roundedClasses} ${cursorClass} object-cover`}
        />
      ) : name ? (
        <div
          className={`${sizeClasses} ${roundedClasses} ${cursorClass} bg-primary-100 text-primary-800 flex items-center justify-center font-medium`}
        >
          {getInitials(name)}
        </div>
      ) : (
        <div
          className={`${sizeClasses} ${roundedClasses} ${cursorClass} bg-neutral-200 flex items-center justify-center`}
        >
          <svg
            className="w-1/2 h-1/2 text-neutral-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
      
      {status !== "none" && (
        <span
          className={`absolute ${statusPositionClasses[statusPosition]} ${statusClasses} ${statusSizeClasses} ${roundedClasses} ring-2 ring-white`}
        ></span>
      )}
    </div>
  );
};

export default Avatar;
