export interface UserType {
  id: number;
  username: string;
  email?: string;
  notification_preference: boolean;
  created_at: string;
  avatar_url?: string;
  recipes_count: number;
  comments_count: number;
  ratings_count: number;
  title?: string;
  current_level: number;
  level_progress_percentage: number;
}

export type UserFormType = Omit<UserType, "id">;
