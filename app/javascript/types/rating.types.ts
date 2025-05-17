import { UserType } from "@customTypes/user.types";

export interface RatingType {
  id: number;
  value: number;
  created_at: string;
  user: UserType;
}
