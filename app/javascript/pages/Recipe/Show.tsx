import { Head, Link } from '@inertiajs/react'
import Recipe from './Recipe'
import { RecipeType } from './types'

interface ShowProps {
  recipe: RecipeType
  flash: { notice?: string }
}

export default function Show({ recipe, flash }: ShowProps) {
  return (
    <>
      <Head title={`Recipe #${recipe.id}`} />

      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <div className="mx-auto">
          {flash.notice && (
            <p className="py-2 px-3 bg-green-50 mb-5 text-green-500 font-medium rounded-lg inline-block">
              {flash.notice}
            </p>
          )}

          <h1 className="font-bold text-4xl">Recipe #{recipe.id}</h1>

          <Recipe recipe={recipe} />

          <Link
            href={`/recipes/${recipe.id}/edit`}
            className="mt-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
          >
            Edit this recipe
          </Link>
          <Link
            href="/recipes"
            className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
          >
            Back to recipes
          </Link>
          <div className="inline-block ml-2">
            <Link
              href={`/recipes/${recipe.id}`}
              as="button"
              method="delete"
              className="mt-2 rounded-lg py-3 px-5 bg-gray-100 font-medium"
            >
              Destroy this recipe
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
