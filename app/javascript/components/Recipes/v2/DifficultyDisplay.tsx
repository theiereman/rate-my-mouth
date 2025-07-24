import { Difficulty } from "@customTypes/recipe.types";
import {
  getBackgroundColorClass,
  getDifficultyLabel,
  getTextColorClass,
} from "@helpers/recipeDifficultyHelper";

export default function DifficultyDisplay({
  difficulty,
}: {
  difficulty: Difficulty;
}) {
  return (
    <div className={`flex items-center gap-2 ${getTextColorClass(difficulty)}`}>
      <div className={`size-3 ${getBackgroundColorClass(difficulty)}`} />
      <span className="lowercase">{getDifficultyLabel(difficulty)}</span>
    </div>
  );
}
