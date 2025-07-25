import { UserType } from "@customTypes/user.types";
import { Badge, LinkButton, Section } from "@components/ui";
import UserAvatar from "@components/Users/UserAvatar";
import UserLink from "@components/Users/UserLink";
import Page from "@components/ui/Pages/Page";
import { lowerCase } from "lodash";
import { LeaderboardProps, leaderboardTypes } from "./Show.props";

const getRankColor = (index: number) => {
  switch (index) {
    case 0:
      return "text-yellow-400"; // Gold
    case 1:
      return "text-gray-400"; // Silver
    case 2:
      return "text-amber-700"; // Bronze
    default:
      return "";
  }
};

export default function Show({ users, type = "recipes" }: LeaderboardProps) {
  const getBadgeValue = (user: UserType) => {
    switch (type) {
      case "recipes":
        return user.recipes_count;
      case "comments":
        return user.comments_count;
      case "ratings":
        return user.ratings_count;
      default:
        return user.recipes_count;
    }
  };

  const typeTitle = lowerCase(
    leaderboardTypes.find((t) => t.value === type)?.title || "",
  );

  return (
    <Page
      title="Classement"
      subtitle={`Classement des utilisateurs par nombre de ${typeTitle} postées`}
    >
      <div className="mb-0 flex gap-2">
        {leaderboardTypes.map((t) => (
          <LinkButton
            variant={type === t.value ? "default" : "ghost"}
            key={t.value}
            href={`/leaderboard?type=${t.value}`}
            className={`px-4 ${type !== t.value ? "font-normal" : ""}`}
          >
            {t.title}
          </LinkButton>
        ))}
      </div>
      <Section variant="no-padding">
        {users.length > 0 ? (
          <ul className="divide-primary-900 divide-y">
            {users.map((user, index) => (
              <li
                key={user.id}
                className={`flex items-center gap-4 p-2 ${getRankColor(index)}`}
              >
                <span className={`w-8 text-center text-xl font-bold`}>
                  {index + 1}
                </span>
                <UserAvatar user={user} size="md" />
                <UserLink className="text-md flex-1" user={user} showTitle />
                <Badge>{getBadgeValue(user).toString()}</Badge>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-8 text-center">
            <p className="text-neutral-600">
              Aucun utilisateur n'a encore posté de {typeTitle}
            </p>
          </div>
        )}
      </Section>
    </Page>
  );
}
