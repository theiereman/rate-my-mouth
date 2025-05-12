import { AchievementType } from "../types";
import { Card, Badge } from "../../../components";

interface AchievementCardProps {
  achievement: AchievementType;
}

export default function AchievementCard({ achievement }: AchievementCardProps) {
  return (
    <Card
      variant="outlined"
      className={`transition-all duration-300 ${
        achievement.unlocked
          ? "border-primary-300"
          : "border-neutral-200 opacity-70"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            achievement.unlocked
              ? "bg-primary-100 text-primary-700"
              : "bg-neutral-100 text-neutral-500"
          }`}
        >
          <span className="material-symbols-outlined">
            {achievement.unlocked ? "emoji_events" : "lock"}
          </span>
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-medium text-neutral-800">{achievement.name}</h3>
            {achievement.unlocked ? (
              <Badge variant="success" size="sm">
                Débloqué
              </Badge>
            ) : (
              <Badge variant="neutral" size="sm">
                À débloquer
              </Badge>
            )}
          </div>
          <p className="text-sm text-neutral-600">{achievement.description}</p>
        </div>
      </div>
    </Card>
  );
}
