import { UserType } from "../User/types";

export interface CommentType {
  id: number;
  content: string;
  created_at: string;
  user: UserType;
}

export enum CommentableType {
  recipe = "recipes",
}
