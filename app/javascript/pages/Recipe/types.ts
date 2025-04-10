export interface RecipeType {
  id: number;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
  comments: CommentType[];
  user: UserType;
}

export interface CommentType {
  id: number;
  content: string;
  user: {
    id: number;
    username: string;
  };
}

export interface UserType {
  id: number;
  username: string;
}

export type RecipeFormType = Omit<RecipeType, "id">;
