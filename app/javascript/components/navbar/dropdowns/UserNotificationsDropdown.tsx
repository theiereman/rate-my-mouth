import { useEffect, useState } from "react";
import NotificationList from "@components/Users/Notifications/NotificationList";
import { NotificationType } from "@customTypes/notifications.types";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import axios from "axios";
import { useToast } from "@contexts/ToastProvider";
import { PagyMetadata } from "@components/ui/Pagination";
import { Button } from "@components/ui";
import NavbarDropdown from "@components/ui/NavbarDropdown";

export default function UserNotificationsDropdown() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [pagyMetadata, setPagyMetadata] = useState<PagyMetadata | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const { showToast } = useToast();

  const isNextPageLoading = currentPage > 1 && isLoading;
  const hasReachedEnd = !pagyMetadata || pagyMetadata.next === null;

  const unreadNotifications: NotificationType[] = notifications.filter(
    (n) => !n.read_at
  );

  const fetchUserNotifications = async (page: number = 1) => {
    try {
      setError(null);
      setCurrentPage(page);
      setIsLoading(true);
      const response = await axios.get(`/notifications?page=${page}`);
      setPagyMetadata(response.data.pagy);
      if (page > 1) {
        setNotifications((prev) => [...prev, ...response.data.notifications]);
      } else {
        setNotifications(response.data.notifications);
      }
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
      setNotifications((prev) =>
        prev.map((n) =>
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n
        )
      );
    } catch (err) {
      showToast("Impossible de marquer la notification comme 'lue'", {
        type: "error",
      });
    }
  };

  return (
    <NavbarDropdown
      buttonChildren={
        <div className="relative flex">
          <span className="material-symbols-outlined text-primary-600">
            notifications
          </span>
          {notifications.filter((n) => !n.read_at).length > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full size-4 flex items-center justify-center z-20">
              {notifications.filter((n) => !n.read_at).length}
            </div>
          )}
        </div>
      }
    >
      <div>
        <div className="flex text-sm items-center justify-between">
          <h1 className="text-neutral-700">Historique des notifications</h1>
          <Button
            disabled={isLoading}
            variant="ghost-primary"
            className="text-xs p-0!"
            onClick={() => fetchUserNotifications(1)}
          >
            Rafraîchir
          </Button>
        </div>
        <Button
          variant="ghost-primary"
          className="text-xs p-0!"
          onClick={handleMarkAllAsRead}
          disabled={unreadNotifications.length === 0}
        >
          Tout marquer comme lu
        </Button>
      </div>
      {isLoading && currentPage == 1 ? (
        <EmptyPlaceholder
          variant="ghost"
          text="Chargement des notifications..."
        ></EmptyPlaceholder>
      ) : error ? (
        <p className="text-error-600 text-sm">{error}</p>
      ) : (
        <>
          <NotificationList
            notifications={notifications}
            handleMarkAsRead={handleMarkAsRead}
          />

          {notifications.length > 0 && (
            <Button
              variant="ghost-primary"
              className="text-xs w-full"
              disabled={hasReachedEnd || isNextPageLoading}
              onClick={() => fetchUserNotifications(pagyMetadata?.next ?? 1)}
            >
              Charger plus{isNextPageLoading && "..."}
            </Button>
          )}
        </>
      )}
    </NavbarDropdown>
  );
}
