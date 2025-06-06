import { Badge, BadgeVariant } from "@components/ui";

const getVariantValue = (difficulty: number): BadgeVariant => {
  switch (difficulty) {
    case 0:
      return "success";
    case 1:
      return "warning";
    case 2:
      return "error";
    default:
      return "neutral";
  }
};

export default function RecipeDifficultyBadge({
  difficulty,
  ...props
}: {
  difficulty: number;
}) {
  const getBadgeText = (difficulty: number): string => {
    switch (difficulty) {
      case 0:
        return "facile";
      case 1:
        return "moyen";
      case 2:
        return "difficile";
      default:
        return "Inconnu";
    }
  };

  return (
    <Badge
      text={getBadgeText(difficulty)}
      variant={getVariantValue(difficulty)}
      {...props}
    />
  );
}
