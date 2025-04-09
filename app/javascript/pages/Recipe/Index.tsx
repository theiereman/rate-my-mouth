import { Head, Link } from '@inertiajs/react'
import { Fragment } from 'react'
import Recipe from './Recipe'
import { RecipeType } from './types'

interface IndexProps {
  recipes: RecipeType[]
  flash: { notice?: string }
}

export default function Index({ recipes, flash }: IndexProps) {
  return (
    <>
      <Head title="Recipes" />
      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        {flash.notice && (
          <p className="py-2 px-3 bg-green-50 mb-5 text-green-500 font-medium rounded-lg inline-block">
            {flash.notice}
          </p>
        )}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-4xl">Recipes</h1>
          <Link
            href="/recipes/new"
            className="rounded-lg py-3 px-5 bg-blue-600 text-white block font-medium"
          >
            New recipe
          </Link>
        </div>

        <div className="min-w-full">
          {recipes.map((recipe) => (
            <Fragment key={recipe.id}>
              <Recipe recipe={recipe} />
              <p>
                <Link
                  href={`/recipes/${recipe.id}`}
                  className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
                >
                  Show this recipe
                </Link>
              </p>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
