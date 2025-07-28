import { AchievementType } from "@customTypes/achievement.types";
import AchievementItem from "@components/Achievements/AchievementItem";
import { UserType } from "@customTypes/user.types";
import { Section } from "@components/ui";

interface AchievementsListProps {
  achievements: AchievementType[];
  user: UserType;
}

export default function AchievementsList({
  achievements,
  user,
}: AchievementsListProps) {
  const unlockedAchievementsCount = achievements.filter(
    (achievement) => achievement.unlocked,
  ).length;

  return (
    <Section
      title="Succès"
      headerAction={
        <span className="text-xl font-bold">{`${unlockedAchievementsCount} / ${achievements.length}`}</span>
      }
      variant="ghost"
    >
      <div className="grid grid-cols-1 gap-4">
        {achievements.map((achievement) => (
          <AchievementItem
            key={achievement.key}
            achievement={achievement}
            user={user}
          />
        ))}
      </div>
    </Section>
  );
}
