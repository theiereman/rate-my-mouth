import { UserType } from "@customTypes/user.types";

type LeaderboardType = "recipes" | "comments" | "ratings";
export const leaderboardTypes: { title: string; value: LeaderboardType }[] = [
  {
    title: "Recettes",
    value: "recipes",
  },
  {
    title: "Commentaires",
    value: "comments",
  },
  {
    title: "Notes",
    value: "ratings",
  },
];

export interface LeaderboardProps {
  users: UserType[];
  type: LeaderboardType;
}
