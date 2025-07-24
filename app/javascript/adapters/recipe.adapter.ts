import { RecipeType, Difficulty, RawRecipe } from "@customTypes/recipe.types";

function stringToDifficulty(difficultyString: string): Difficulty {
  const mapping: Record<string, Difficulty> = {
    easy: Difficulty.Easy,
    medium: Difficulty.Medium,
    hard: Difficulty.Hard,
  };

  return mapping[difficultyString.toLowerCase().trim()] ?? Difficulty.Easy;
}

export class RecipeAdapter {
  static fromApi(rawRecipe: RawRecipe): RecipeType {
    return {
      ...rawRecipe,
      difficulty: stringToDifficulty(rawRecipe.difficulty),
    };
  }

  static fromApiArray(rawRecipes: RawRecipe[]): RecipeType[] {
    return rawRecipes.map(this.fromApi);
  }
}
