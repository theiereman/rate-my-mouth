import { RatingType } from "@customTypes/rating.types";
import { TagType } from "@customTypes/tag.types";
import { UserType } from "@customTypes/user.types";

export interface IngredientType {
  id: number;
  name: string;
  category: string;
}

export interface InstructionType {
  id: number;
  name: string;
  category: string;
}

export interface RecipeType {
  id: number;
  name: string;
  url: string;
  number_of_servings: number;
  difficulty: number;
  ingredients: IngredientType[];
  instructions: InstructionType[];
  description: string;
  difficulty_value: number;
  thumbnail_url?: string;
  average_rating: number;
  created_at: string;
  updated_at: string;
  ratings: RatingType[];
  user: UserType;
  tags?: TagType[];
  comments_count: number;
  ratings_count: number;
}

export type RecipeFormType = {
  name: string;
  url: string;
  ingredients_attributes: {
    id?: number;
    name: string;
    category: string;
    _destroy?: boolean;
  }[];
  instructions_attributes: {
    id?: number;
    name: string;
    category: string;
    _destroy?: boolean;
  }[];
  description?: string;
  number_of_servings: number;
  difficulty: number;
  tags_attributes?: { id?: number; name: string }[];
  thumbnail?: string | null | undefined;
};

//ingredients / instructions forms
export type ItemType = "ingredient" | "instruction" | undefined;
export interface RecipeItem {
  id: string;
  type: ItemType;
  value: string;
  category: string;
  dbId?: number; // ID de la base de données pour les mises à jour
  _destroy?: boolean; // Pour marquer les éléments à supprimer
}
export interface ItemCategory {
  name: string;
  color?: string;
}
