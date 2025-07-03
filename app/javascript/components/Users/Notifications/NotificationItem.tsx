import {
  NotificationEventType,
  NotificationType,
} from "@customTypes/notifications.types";
import { formatDateTime } from "@helpers/date-helper";
import { Link } from "@inertiajs/react";

export default function NotificationItem({
  notification,
}: {
  notification: NotificationType;
}) {
  const icon = getIconForEvent(notification.event);

  return (
    <div className="flex items-center">
      <span className="material-symbols-outlined text-primary-600 mr-2">
        {icon}
      </span>
      <div className="text-sm flex flex-col">
        {getMessageElementForEvent(notification.event, notification.recipe_id)}
        <span className="text-xs text-neutral-500">
          {formatDateTime(notification.created_at)}
        </span>
      </div>
    </div>
  );
}

function getIconForEvent(event: NotificationEventType) {
  switch (event) {
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

function getMessageForEvent(event: NotificationEventType) {
  switch (event) {
    case "new_comment":
      return "Nouveau commentaire";
    case "new_rating":
      return "Nouvelle note";
    case "achievement_unlocked":
      return "Succès débloqué !";
    default:
      return "Notification inconnue";
  }
}

function getMessageElementForEvent(
  type: NotificationEventType,
  recipe_id?: number | null
) {
  return !recipe_id || recipe_id === 0 ? (
    <p>{getMessageForEvent(type)}</p>
  ) : (
    <Link
      className="hover:text-primary-600 hover:underline"
      href={`/recipes/${recipe_id}`}
    >
      {getMessageForEvent(type)}
    </Link>
  );
}
