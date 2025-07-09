import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { NotificationType } from "@customTypes/notifications.types";
import NotificationItem from "./NotificationItem";

export default function NotificationList({
  notifications,
  handleMarkAsRead,
}: {
  notifications: NotificationType[];
  handleMarkAsRead?: (id: number) => void;
}) {
  return (
    <>
      {notifications.length > 0 ? (
        <ul className="divide-y divide-neutral-200">
          {notifications.map((notification) => (
            <li className="py-1" key={notification.id}>
              <NotificationItem
                notification={notification}
                handleMarkAsRead={handleMarkAsRead}
              />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPlaceholder variant="ghost" text="Aucune notification" />
      )}
    </>
  );
}
