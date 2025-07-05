export type NotificationEventType =
  | "new_comment"
  | "new_rating"
  | "achievement_unlocked"
  | "unknown";

export interface NotificationType {
  id: number;
  event: NotificationEventType;
  message: string | null;
  linked_item_path: string | null;
  read_at: string | null;
  seen_at: string | null;
  created_at: string;
}
