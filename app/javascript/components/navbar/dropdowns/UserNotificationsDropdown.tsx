import { useEffect, useState } from "react";
import NotificationList from "@components/Users/Notifications/NotificationList";
import { NotificationType } from "@customTypes/notifications.types";
import { EmptyPlaceholder } from "@components/ui";
import axios from "axios";
import { useToast } from "@contexts/ToastProvider";
import { PagyMetadata } from "@components/ui/Pagination";
import { Button, Section } from "@components/ui";
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
    (n) => !n.read_at,
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
          n.id === id ? { ...n, read_at: new Date().toISOString() } : n,
        ),
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
        <div className="relative flex size-full items-center">
          <span className="material-symbols-outlined">notifications</span>
          {notifications.filter((n) => !n.read_at).length > 0 && (
            <span className="text-primary-900 text-sm font-bold">
              {notifications.filter((n) => !n.read_at).length}
            </span>
          )}
        </div>
      }
    >
      <Section
        title="Notifications"
        headerAction={
          <Button
            disabled={isLoading}
            variant="ghost"
            onClick={() => fetchUserNotifications(1)}
          >
            <span className="material-symbols-outlined text-background hover:animate-spin">
              refresh
            </span>
          </Button>
        }
      >
        <Button
          variant="ghost"
          className="mb-2 text-xs"
          onClick={handleMarkAllAsRead}
          disabled={unreadNotifications.length === 0}
        >
          Tout marquer comme lu
        </Button>
        <div className="max-h-70 overflow-y-auto">
          {isLoading && currentPage == 1 ? (
            <EmptyPlaceholder>Chargement des notifications...</EmptyPlaceholder>
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
                  className="mt-2 w-full text-xs"
                  disabled={hasReachedEnd || isNextPageLoading}
                  onClick={() =>
                    fetchUserNotifications(pagyMetadata?.next ?? 1)
                  }
                >
                  Charger plus{isNextPageLoading && "..."}
                </Button>
              )}
            </>
          )}
        </div>
      </Section>
    </NavbarDropdown>
  );
}
