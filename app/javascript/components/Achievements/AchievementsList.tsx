import { AchievementType } from "@customTypes/achievement.types";
import AchievementItem from "@components/Achievements/AchievementItem";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { UserType } from "@customTypes/user.types";
import Section from "@components/ui/Pages/Section";

interface AchievementsListProps {
  achievements: AchievementType[];
  user: UserType;
}

export default function AchievementsList({
  achievements,
  user,
}: AchievementsListProps) {
  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked
  );
  const lockedAchievements = achievements.filter(
    (achievement) => !achievement.unlocked
  );

  return (
    <Section title="Succès">
      <div className="mb-6">
        <h3 className="font-bold text-neutral-800 mb-3">
          Succès débloqués ({unlockedAchievements.length})
        </h3>
        {unlockedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {unlockedAchievements.map((achievement) => (
              <AchievementItem
                key={achievement.key}
                user={user}
                achievement={achievement}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder text="Aucun succès débloqué pour le moment" />
        )}
      </div>

      <div>
        <h3 className="font-bold text-neutral-800 mb-3">
          Succès à débloquer ({lockedAchievements.length})
        </h3>
        {lockedAchievements.length > 0 ? (
          <div className="grid grid-cols-1 gap-4">
            {lockedAchievements.map((achievement) => (
              <AchievementItem
                key={achievement.key}
                achievement={achievement}
                user={user}
              />
            ))}
          </div>
        ) : (
          <EmptyPlaceholder text="Tous les succès ont été débloqués !" />
        )}
      </div>
    </Section>
  );
}
