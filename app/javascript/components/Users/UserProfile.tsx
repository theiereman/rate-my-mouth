import { UserType } from "@customTypes/user.types";
import { Badge } from "@components/ui";
import { formatDate } from "@helpers/date-helper";
import UserAvatar from "@components/Users/UserAvatar";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import Section from "@components/ui/Pages/Section";

export default function UserProfile({ user }: { user: UserType }) {
  const { isCurrentUser } = useUserIsCurrentUser(user);

  return (
    <Section>
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
        <Badge text={`${user.comments_count} commentaires`} variant="primary" />
        <Badge text={`${user.recipes_count} recettes`} variant="secondary" />
        <Badge text={`${user.ratings_count} évaluations`} variant="accent" />
      </div>
    </Section>
  );
}
