import { CommentType } from "../Comments/types";
import { RatingType } from "../Ratings/types";
import { UserType } from "../User/types";

export interface RecipeType {
  id: number;
  name: string;
  url: string;
  number_of_servings: number;
  difficulty: number;
  difficulty_value: number;
  ingredients: string[] | null;
  instructions: string[] | null;
  average_rating: number;
  created_at: string;
  updated_at: string;
  comments: CommentType[];
  ratings: RatingType[];
  user: UserType;
}

export type RecipeFormType = {
  name: string;
  url: string;
  ingredients: string[] | null;
  instructions: string[] | null;
  number_of_servings: number;
  difficulty: number;
};
