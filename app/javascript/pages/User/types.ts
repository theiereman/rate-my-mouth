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
}

export type UserFormType = Omit<UserType, "id">;
