import { CommentType } from "../Comments/types";
import { RatingType } from "../Ratings/types";
import { UserType } from "../User/types";

export interface RecipeType {
  id: number;
  name: string;
  url: string;
  average_rating: number;
  created_at: string;
  updated_at: string;
  comments: CommentType[];
  ratings: RatingType[];
  user: UserType;
}

export type RecipeFormType = Omit<RecipeType, "id">;
