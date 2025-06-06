import { UserType } from "@customTypes/user.types";
import { Card, Badge, LinkButton } from "@components/ui";
import UserAvatar from "@components/Users/UserAvatar";
import UserLink from "@components/Users/UserLink";
import Page from "@components/ui/Pages/Page";
import { lowerCase } from "lodash";
import { LeaderboardProps, leaderboardTypes } from "./Show.props";

const getMedalColor = (index: number) => {
  switch (index) {
    case 0:
      return "text-yellow-500"; // Gold
    case 1:
      return "text-gray-400"; // Silver
    case 2:
      return "text-amber-700"; // Bronze
    default:
      return "text-neutral-500";
  }
};

const getMedalIcon = (index: number) => {
  switch (index) {
    case 0:
      return "emoji_events";
    case 1:
      return "military_tech";
    case 2:
      return "workspace_premium";
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
    leaderboardTypes.find((t) => t.value === type)?.title || ""
  );

  return (
    <Page
      title="Classement"
      subtitle={`Classement des utilisateurs par nombre de ${typeTitle} postées`}
    >
      {leaderboardTypes.map((t) => (
        <LinkButton
          variant="ghost"
          preserveScroll
          key={t.value}
          href={`/leaderboard?type=${t.value}`}
          className={`px-4 py-2 rounded-none rounded-t-md! hover:text-primary-600! ${
            type === t.value
              ? "bg-primary-100! text-primary-600"
              : "text-neutral-600"
          }`}
        >
          {t.title}
        </LinkButton>
      ))}
      <Card className="p-0!">
        <div></div>
        {users.length > 0 ? (
          <ul className="divide-y divide-neutral-200">
            {users.map((user, index) => (
              <li key={user.id} className="p-4 flex items-center gap-4">
                <span
                  className={`flex-shrink-0 w-8 text-center font-bold ${getMedalColor(
                    index
                  )}`}
                >
                  {index + 1}
                  <span className="material-symbols-outlined block">
                    {getMedalIcon(index)}
                  </span>
                </span>
                <UserAvatar user={user} size="md" className="flex-shrink-0" />
                <UserLink className="flex-1" user={user} showTitle />
                <Badge
                  text={`${getBadgeValue(user)} ${typeTitle}`}
                  variant="primary"
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-600">
              Aucun utilisateur n'a encore posté de {typeTitle}
            </p>
          </div>
        )}
      </Card>
    </Page>
  );
}
