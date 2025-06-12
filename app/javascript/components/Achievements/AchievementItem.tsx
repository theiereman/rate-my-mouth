import { Card, Badge, LinkButton } from "@components/ui";
import { AchievementType } from "@customTypes/achievement.types";
import { UserType } from "@customTypes/user.types";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import { Link } from "@inertiajs/react";

interface AchievementCardProps {
  achievement: AchievementType;
  user: UserType;
}

export default function AchievementItem({
  achievement,
  user,
}: AchievementCardProps) {
  const isSelectedAchievement = user.title === achievement.name;
  const { isCurrentUser } = useUserIsCurrentUser(user);

  return (
    <Card
      variant="flat"
      className={`transition-all duration-300 p-0! ${
        achievement.unlocked
          ? "border-primary-300"
          : "border-neutral-200 opacity-70"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            achievement.unlocked
              ? "bg-primary-100 text-primary-700"
              : "bg-neutral-100 text-neutral-500"
          }`}
        >
          <span className="material-symbols-outlined">
            {achievement.unlocked
              ? "emoji_events"
              : achievement.secret
              ? "question_mark"
              : "lock"}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-start gap-2">
            {achievement.unlocked && isCurrentUser ? (
              <Link
                method="patch"
                preserveState
                preserveScroll
                className={`font-semibold underline text-primary-600 text-start cursor-pointer`}
                title="Définir ce succès comme titre"
                href={`/select_achievement_as_title?key=${achievement.key}`}
              >
                {achievement.name}
              </Link>
            ) : (
              <h3 className="text-neutral-800">{achievement.name}</h3>
            )}

            {achievement.unlocked && isCurrentUser && isSelectedAchievement && (
              <Badge text="Titre actuel" variant="primary" />
            )}
            <div className="flex-1"></div>
            {achievement.unlocked ? (
              <>
                <Badge text="Débloqué" variant="valid" />
              </>
            ) : (
              <Badge text="À débloquer" variant="neutral" />
            )}
          </div>
          {(!achievement.secret || achievement.unlocked) && (
            <p className="text-sm text-neutral-600">
              {achievement.description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
