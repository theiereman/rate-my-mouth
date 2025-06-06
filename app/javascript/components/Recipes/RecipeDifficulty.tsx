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

export default function RecipeDifficulty({
  difficulty,
  ...props
}: {
  difficulty: number;
}) {
  return (
    <Badge variant={getVariantValue(difficulty)} size="md" {...props}>
      {difficulty === 0
        ? "facile"
        : difficulty === 1
        ? "moyen"
        : difficulty === 2
        ? "difficile"
        : "Inconnu"}
    </Badge>
  );
}
