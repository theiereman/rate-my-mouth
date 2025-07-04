import { useEffect, useState } from "react";
import NotificationList from "../Users/Notifications/NotificationList";
import { usePopupElement } from "@hooks/usePopupElement";
import { NotificationType } from "@customTypes/notifications.types";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import axios from "axios";
import { useToast } from "@contexts/ToastProvider";

export default function UserNotifications() {
  const { isOpen, ref } = usePopupElement();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const { showToast } = useToast();

  const unreadNotifications: NotificationType[] = notifications.filter(
    (n) => !n.read_at
  );

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

  useEffect(() => {
    fetchUserNotifications();
  }, []);

  const handleMarkAllAsRead = async () => {
    if (unreadNotifications.length === 0) return;

    try {
      await axios.post("/notifications/mark_as_read", {
        notification_ids: unreadNotifications.map((n) => n.id),
      });
      fetchUserNotifications();
    } catch (err) {
      showToast("Impossible de marquer toutes les notifications comme 'lues'", {
        type: "error",
      });
    }
  };

  const handleMarkAsRead = async (id: number) => {
    try {
      await axios.post("/notifications/mark_as_read", {
        notification_ids: [id],
      });
      fetchUserNotifications();
    } catch (err) {
      showToast("Impossible de marquer la notification comme 'lue'", {
        type: "error",
      });
    }
  };

  return (
    <div ref={ref} className="relative group">
      <button className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center space-x-3 focus:outline-none cursor-pointer transition-transform group-hover:scale-105">
        <span className="material-symbols-outlined text-primary-600">
          notifications
        </span>
      </button>

      {notifications.filter((n) => !n.read_at).length > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center z-20">
          {notifications.filter((n) => !n.read_at).length}
        </div>
      )}

      <div
        className={`${
          !isOpen ? "hidden" : "flex"
        }  absolute right-0 w-86 max-w-[70vw] bg-white rounded-md shadow-lg z-10 py-2 px-4 flex-col gap-2 max-h-64 overflow-y-auto`}
      >
        <div>
          <div className="flex text-sm items-center justify-between">
            <h1 className="text-neutral-700">Historique des notifications</h1>
            <button
              disabled={isLoading}
              className="text-xs disabled:text-neutral-400 enabled:text-primary-600! enabled:underline! enabled:cursor-pointer"
              onClick={fetchUserNotifications}
            >
              Rafraîchir
            </button>
          </div>
          <button
            className="text-xs disabled:text-neutral-400 enabled:text-primary-600! enabled:underline! enabled:cursor-pointer"
            onClick={handleMarkAllAsRead}
            disabled={unreadNotifications.length === 0}
          >
            Tout marquer comme lu
          </button>
        </div>
        {isLoading ? (
          <EmptyPlaceholder
            variant="ghost"
            text="Chargement des notifications..."
          ></EmptyPlaceholder>
        ) : error ? (
          <p className="text-error-600">{error}</p>
        ) : (
          <>
            <NotificationList
              notifications={notifications}
              handleMarkAsRead={handleMarkAsRead}
            />
          </>
        )}
      </div>
    </div>
  );
}
