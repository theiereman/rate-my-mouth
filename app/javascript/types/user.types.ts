export interface UserType {
  id: number;
  username: string;
  email?: string;
  notification_preference: boolean;
  created_at: string;
  avatar_url?: string;
  number_of_recipes: number;
  number_of_comments: number;
  number_of_ratings: number;
  title?: string;
}

export type UserFormType = Omit<UserType, "id">;
