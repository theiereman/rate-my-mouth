import { Button } from "@components/ui";
import { NotificationType } from "@customTypes/notifications.types";
import { formatDateTime } from "@helpers/date-helper";
import { router } from "@inertiajs/react";

export default function NotificationItem({
  notification,
  handleMarkAsRead,
}: {
  notification: NotificationType;
  handleMarkAsRead?: (id: number) => void;
}) {
  const icon = getIconForEvent(notification);

  const handleClick = async () => {
    if (notification.read_at === null) {
      handleMarkAsRead?.(notification.id);
    }

    if (notification.linked_item_path) {
      router.visit(notification.linked_item_path);
    }
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="material-symbols-outlined text-primary-600 mr-2">
        {icon}
      </span>
      <div className="text-sm flex-1 flex gap-1 flex-col">
        <Button
          variant="ghost"
          onClick={handleClick}
          className="hover:text-primary-600! hover:underline text-start! p-0! text-sm/4"
        >
          <span className="line-clamp-3 w-full">{notification.message}</span>
        </Button>
        <span className="text-xs text-neutral-400">
          {formatDateTime(notification.created_at)}
        </span>
      </div>
      {!notification.read_at && (
        <span className="size-2 rounded-full mx-auto bg-secondary-600 animate-pulse" />
      )}
    </div>
  );
}

function getIconForEvent(notification: NotificationType) {
  switch (notification.event) {
    case "new_comment":
      return "comment";
    case "new_rating":
      return "star";
    case "achievement_unlocked":
      return "emoji_events";
    default:
      return "notifications"; // Default icon if type is unknown
  }
}
