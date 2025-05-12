import { CommentType } from "../Comments/types";
import { RatingType } from "../Ratings/types";
import { TagType } from "../Tag/types";
import { UserType } from "../User/types";

export interface RecipeType {
  id: number;
  name: string;
  url: string;
  number_of_servings: number;
  difficulty: number;
  ingredients: string[] | null;
  instructions: string[] | null;
  description: string;
  difficulty_value: number;
  average_rating: number;
  created_at: string;
  updated_at: string;
  comments: CommentType[];
  ratings: RatingType[];
  user: UserType;
  tags?: TagType[];
}

export type RecipeFormType = {
  name: string;
  url: string;
  ingredients: string[] | null;
  instructions: string[] | null;
  description: string;
  number_of_servings: number;
  difficulty: number;
  tags_attributes?: { id?: number; name: string }[];
};
