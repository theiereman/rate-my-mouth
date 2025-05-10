export interface AchievementType {
  key: string;
  name: string;
  description: string;
  unlocked: boolean;
}

export interface UserType {
  id: number;
  username: string;
  email?: string;
  created_at: string;
  number_of_recipes: number;
  number_of_comments: number;
  number_of_ratings: number;
}

export type UserFormType = Omit<UserType, "id">;
