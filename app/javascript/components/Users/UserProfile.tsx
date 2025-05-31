import { UserType } from "@customTypes/user.types";
import { Badge, Card } from "@components/ui";
import { formatDate } from "@helpers/date-helper";
import UserAvatar from "@components/Users/UserAvatar";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";

export default function UserProfile({ user }: { user: UserType }) {
  const { isCurrentUser } = useUserIsCurrentUser(user);

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-600">
            person
          </span>
          Profil
        </h2>
      </Card.Header>
      <Card.Body className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <UserAvatar user={user} size="xl" allowAvatarChange={isCurrentUser} />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-neutral-800">
              {user.username}{" "}
              <span className="text-xs font-light text-neutral-600">
                (membre depuis le {formatDate(user.created_at)})
              </span>
            </h3>
            {user.title ? (
              <p className="text-sm text-neutral-700">{user.title}</p>
            ) : (
              <p className="italic text-sm text-neutral-400">
                Aucun titre selectionné
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge
            text={`${user.comments_count} commentaires`}
            variant="primary"
          />
          <Badge text={`${user.recipes_count} recettes`} variant="secondary" />
          <Badge text={`${user.ratings_count} évaluations`} variant="accent" />
        </div>
      </Card.Body>
    </Card>
  );
}
