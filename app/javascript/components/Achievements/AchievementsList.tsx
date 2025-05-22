import { AchievementType } from "@customTypes/achievement.types";
import { Card } from "@components/ui";
import AchievementItem from "@components/Achievements/AchievementItem";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";

interface AchievementsListProps {
  achievements: AchievementType[];
}

export default function AchievementsList({
  achievements,
}: AchievementsListProps) {
  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked
  );
  const lockedAchievements = achievements.filter(
    (achievement) => !achievement.unlocked
  );

  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-600">
            emoji_events
          </span>
          Succès
        </h2>
      </Card.Header>
      <Card.Body>
        <div className="mb-6">
          <h3 className="font-medium text-neutral-800 mb-3">
            Succès débloqués ({unlockedAchievements.length})
          </h3>
          {unlockedAchievements.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {unlockedAchievements.map((achievement) => (
                <AchievementItem
                  key={achievement.key}
                  achievement={achievement}
                />
              ))}
            </div>
          ) : (
            <EmptyPlaceholder text="Aucun succès débloqué pour le moment" />
          )}
        </div>

        <div>
          <h3 className="font-medium text-neutral-800 mb-3">
            Succès à débloquer ({lockedAchievements.length})
          </h3>
          {lockedAchievements.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {lockedAchievements.map((achievement) => (
                <AchievementItem
                  key={achievement.key}
                  achievement={achievement}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-4 bg-neutral-50 rounded-lg border border-neutral-100">
              <p className="text-sm text-neutral-600">
                Tous les succès ont été débloqués !
              </p>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
