import { UserType } from "../types";
import { Card } from "../../../components/ui";

interface UserProfileProps {
  user: UserType;
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <Card variant="outlined" className="animate-fade-in">
      <Card.Header>
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-600">
            person
          </span>
          Mon profil
        </h2>
      </Card.Header>
      <Card.Body>
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="flex-shrink-0 w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center text-primary-500">
            <span className="material-symbols-outlined material-icon--lg">
              person
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-medium text-neutral-800 mb-1">
              {user.username}
            </h3>
            {user.email && (
              <p className="text-neutral-600 mb-3">{user.email}</p>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
