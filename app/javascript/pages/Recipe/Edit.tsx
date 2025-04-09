import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { RecipeType } from './types'

interface EditProps {
  recipe: RecipeType
}

export default function Edit({ recipe }: EditProps) {
  return (
    <>
      <Head title="Editing recipe" />

      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <h1 className="font-bold text-4xl">Editing recipe</h1>

        <Form
          recipe={recipe}
          onSubmit={(form) => {
            form.transform((data) => ({ recipe: data }))
            form.patch(`/recipes/${recipe.id}`)
          }}
          submitText="Update Recipe"
        />

        <Link
          href={`/recipes/${recipe.id}`}
          className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
        >
          Show this recipe
        </Link>
        <Link
          href="/recipes"
          className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
        >
          Back to recipes
        </Link>
      </div>
    </>
  )
}
