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
    <div className="flex gap-2">
      <span className="material-symbols-outlined text-primary-600 mt-1 mr-1">
        {icon}
      </span>
      <div className="flex flex-1 flex-col gap-1 text-sm">
        <Button
          variant="ghost"
          onClick={handleClick}
          className="text-start! text-sm/4 font-semibold normal-case! hover:underline"
        >
          <span className="line-clamp-3 w-full">{notification.message}</span>
        </Button>
        <span className="text-primary-900/60 text-xs">
          {formatDateTime(notification.created_at)}
        </span>
      </div>
      {!notification.read_at && (
        <span className="bg-secondary-600 mx-auto size-2 animate-pulse rounded-full" />
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
