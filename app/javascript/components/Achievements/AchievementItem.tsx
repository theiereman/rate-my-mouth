import { Section, LinkButton } from "@components/ui";
import { AchievementType } from "@customTypes/achievement.types";
import { UserType } from "@customTypes/user.types";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";

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
    <Section
      title={achievement.name}
      headerAction={
        achievement.unlocked ? (
          <span className="material-symbols-outlined">trophy</span>
        ) : (
          <span className="material-symbols-outlined">lock</span>
        )
      }
      className={!achievement.unlocked ? "opacity-60" : ""}
    >
      <div className="flex items-center gap-3">
        <p className="flex-1 text-sm text-neutral-600">
          {!achievement.secret ? achievement.description : "Succès caché"}
        </p>
        {achievement.unlocked && isCurrentUser && (
          <LinkButton
            disabled={isSelectedAchievement}
            method="patch"
            className="w-44"
            href={`/select_achievement_as_title?key=${achievement.key}`}
          >
            <span>
              {isSelectedAchievement ? "Titre actuel" : "Choisir le titre"}
            </span>
          </LinkButton>
        )}
      </div>
    </Section>
  );
}
