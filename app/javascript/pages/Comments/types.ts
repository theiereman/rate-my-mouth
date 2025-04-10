export interface CommentType {
  id: number;
  content: string;
  created_at: string;
  user: {
    id: number;
    username: string;
  };
}

export enum CommentableType {
  recipe = "recipes",
}
