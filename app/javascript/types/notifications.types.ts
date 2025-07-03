import { RecipeMinimalType } from "@customTypes/recipe.types";

export type NotificationEventType =
  | "new_comment"
  | "new_rating"
  | "achievement_unlocked"
  | "unknown";

export interface NotificationType {
  id: number;
  event: NotificationEventType;
  recipe: RecipeMinimalType | null;
  read_at: string | null;
  seen_at: string | null;
  created_at: string;
}
