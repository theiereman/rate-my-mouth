import { Difficulty } from "@customTypes/recipe.types";

export const getTextColorClass = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return "text-green-500";
    case Difficulty.Medium:
      return "text-yellow-500";
    case Difficulty.Hard:
      return "text-red-500";
    default:
      return "text-gray-500";
  }
};

export const getBackgroundColorClass = (difficulty: Difficulty) => {
  switch (difficulty) {
    case Difficulty.Easy:
      return "bg-green-500";
    case Difficulty.Medium:
      return "bg-yellow-500";
    case Difficulty.Hard:
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
};

export function stringToDifficulty(difficultyString: string): Difficulty {
  const mapping: Record<string, Difficulty> = {
    easy: Difficulty.Easy,
    medium: Difficulty.Medium,
    hard: Difficulty.Hard,
  };

  const normalized = difficultyString.toLowerCase().trim();
  return mapping[normalized] ?? Difficulty.Easy; // valeur par défaut
}

export function getDifficultyLabel(difficulty: Difficulty): string {
  switch (difficulty) {
    case Difficulty.Easy:
      return "Facile";
    case Difficulty.Medium:
      return "Moyen";
    case Difficulty.Hard:
      return "Difficile";
    default:
      return "Inconnu";
  }
}

export function getDifficultyValue(value: string): number {
  switch (value.toLowerCase()) {
    case "easy":
      return 0;
    case "medium":
      return 1;
    case "hard":
      return 2;
    default:
      return 0;
  }
}
