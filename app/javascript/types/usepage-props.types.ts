import { UserType } from "./user.types";

export interface PageProps {
  current_user: UserType;
  [key: string]: any;
}
