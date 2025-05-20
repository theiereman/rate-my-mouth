import { UserType } from "@customTypes/user.types";
import { Card, Badge } from "@components/ui";
import UserAvatar from "@components/Users/UserAvatar";
import UserLink from "@components/Users/UserLink";
import Page from "@layouts/Page";

interface LeaderboardProps {
  users: UserType[];
}

export default function Show({ users }: LeaderboardProps) {
  // Get medal color based on position
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

  return (
    <Page
      title="Classement"
      subtitle="Classement des utilisateurs par nombre de recettes postées"
    >
      <Card className="p-0!">
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
                  {index < 3 && (
                    <span className="material-symbols-outlined block">
                      {index === 0
                        ? "emoji_events"
                        : index === 1
                        ? "military_tech"
                        : "workspace_premium"}
                    </span>
                  )}
                </span>
                <UserAvatar user={user} size="md" className="flex-shrink-0" />
                <UserLink className="flex-1" user={user} />
                <Badge variant="primary" size="md">
                  {user.number_of_recipes} recettes
                </Badge>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-8">
            <p className="text-neutral-600">
              Aucun utilisateur n'a encore posté de recettes
            </p>
          </div>
        )}
      </Card>
    </Page>
  );
}
