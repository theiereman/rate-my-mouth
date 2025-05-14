import { UserType } from "@customTypes/user.types";
import { Badge, Card } from "@components/ui";
import { formatDate } from "@helpers/date-helper";
import UserAvatar from "@components/Users/UserAvatar";

interface UserProfileProps {
  user: UserType;
}

export default function UserProfile({ user }: UserProfileProps) {
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
          <UserAvatar user={user} size="xl" allowAvatarChange />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-neutral-800 mb-1">
              {user.username}
            </h3>
            <p className="text-sm text-neutral-600">
              Membre depuis le {formatDate(user.created_at)}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="primary">
            {user.number_of_comments} commentaires
          </Badge>
          <Badge variant="secondary">{user.number_of_recipes} recettes</Badge>
          <Badge variant="accent">{user.number_of_ratings} évaluations</Badge>
        </div>
      </Card.Body>
    </Card>
  );
}
