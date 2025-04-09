export interface RecipeType {
  id: number
  name: string
  url: string
}

export type RecipeFormType = Omit<RecipeType, 'id'>
