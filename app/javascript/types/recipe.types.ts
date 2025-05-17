import { CommentType } from "@customTypes/comment.types";
import { RatingType } from "@customTypes/rating.types";
import { TagType } from "@customTypes/tag.types";
import { UserType } from "@customTypes/user.types";

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
  thumbnail_url?: string;
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
  thumbnail?: string | null;
};
