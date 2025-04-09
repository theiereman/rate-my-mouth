import { RecipeType } from './types'

interface RecipeProps {
  recipe: RecipeType
}

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <div>
      <p className="my-5">
        <strong className="block font-medium mb-1">Name:</strong>
        {recipe.name?.toString()}
      </p>
      <p className="my-5">
        <strong className="block font-medium mb-1">Url:</strong>
        {recipe.url?.toString()}
      </p>
    </div>
  )
}
