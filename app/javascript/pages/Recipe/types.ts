export interface RecipeType {
  id: number;
  name: string;
  url: string;
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
