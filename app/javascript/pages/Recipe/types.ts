import { CommentType } from "../Comments/types";
import { UserType } from "../User/types";

export interface RecipeType {
  id: number;
  name: string;
  url: string;
  created_at: string;
  updated_at: string;
  comments: CommentType[];
  user: UserType;
}

export type RecipeFormType = Omit<RecipeType, "id">;
