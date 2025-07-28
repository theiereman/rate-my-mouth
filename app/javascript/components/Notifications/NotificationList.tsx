import { EmptyPlaceholder } from "@components/ui";
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
        <ul className="divide-primary-900/20 divide-y">
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
        <EmptyPlaceholder>Aucune notification</EmptyPlaceholder>
      )}
    </>
  );
}
