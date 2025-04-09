import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { RecipeFormType, RecipeType } from './types'

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<typeof useForm<TForm>>

interface FormProps {
  recipe: RecipeType
  onSubmit: (form: InertiaFormProps<RecipeFormType>) => void
  submitText: string
}

export default function Form({ recipe, onSubmit, submitText }: FormProps) {
  const form = useForm<RecipeFormType>({
    name: recipe.name,
    url: recipe.url,
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="my-5">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={data.name}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('name', e.target.value)}
        />
        {errors.name && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.name}
          </div>
        )}
      </div>

      <div className="my-5">
        <label htmlFor="url">Url</label>
        <input
          type="text"
          name="url"
          id="url"
          value={data.url}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('url', e.target.value)}
        />
        {errors.url && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.url}
          </div>
        )}
      </div>

      <div className="inline">
        <button
          type="submit"
          disabled={processing}
          className="rounded-lg py-3 px-5 bg-blue-600 text-white inline-block font-medium cursor-pointer"
        >
          {submitText}
        </button>
      </div>
    </form>
  )
}
