import { useEffect, useState } from "react";
import NotificationList from "../Users/Notifications/NotificationList";
import { usePopupElement } from "@hooks/usePopupElement";
import axios from "axios";
import { NotificationType } from "@customTypes/notifications.types";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { LinkButton } from "@components/ui";
import { router } from "@inertiajs/react";

export default function UserNotifications() {
  const { isOpen, ref } = usePopupElement();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const unreadNotifications: NotificationType[] = notifications.filter(
    (n) => !n.read_at
  );

  useEffect(() => {
    const fetchUserNotifications = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const response = await axios.get("/notifications?limit=10");
        setNotifications(response.data.notifications);
      } catch (err) {
        setError("Erreur lors du chargement des notifications");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserNotifications();
  }, []);

  useEffect(() => {
    if (isOpen && unreadNotifications.length > 0) {
      const markNotificationsAsSeen = async () => {
        try {
          await router.post("/notifications/mark_as_read", {
            notification_ids: unreadNotifications.map((n) => n.id),
          });
        } catch (err) {
          console.error("Erreur lors de la mise à jour des notifications", err);
        }
      };

      markNotificationsAsSeen();
    }
  }, [isOpen]);

  return (
    <div ref={ref} className="relative group">
      <button className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center space-x-3 focus:outline-none cursor-pointer transition-transform group-hover:scale-105">
        <span className="material-symbols-outlined text-primary-600">
          notifications
        </span>
      </button>

      {/* Unread notifications badge */}
      {notifications.filter((n) => !n.read_at).length > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-20">
          {notifications.filter((n) => !n.read_at).length}
        </div>
      )}
      <div
        className={`${
          !isOpen ? "hidden" : "flex"
        }  absolute right-0 w-64 bg-white rounded-md shadow-lg z-10 py-2 px-4 flex-col gap-2 max-h-64 overflow-y-auto`}
      >
        <h1 className="text-sm font-medium text-neutral-700">
          Historique des notifications
        </h1>
        {isLoading ? (
          <EmptyPlaceholder
            variant="ghost"
            text="Chargement des notifications..."
          ></EmptyPlaceholder>
        ) : error ? (
          <EmptyPlaceholder variant="ghost" text={error}></EmptyPlaceholder>
        ) : (
          <>
            <NotificationList notifications={notifications} />
            <LinkButton href="#" variant="outline" className="mt-2 text-sm">
              Voir plus
            </LinkButton>
          </>
        )}
      </div>
    </div>
  );
}
