import { useForm } from '@inertiajs/react'
import { FormEvent } from 'react'
import { UserFormType, UserType } from './types'

// Temporary fix for InertiaFormProps not being exported from @inertiajs/react
type InertiaFormProps<TForm extends Record<string, any>> = ReturnType<typeof useForm<TForm>>

interface FormProps {
  user: UserType
  onSubmit: (form: InertiaFormProps<UserFormType>) => void
  submitText: string
}

export default function Form({ user, onSubmit, submitText }: FormProps) {
  const form = useForm<UserFormType>({
    username: user.username,
  })
  const { data, setData, errors, processing } = form

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="contents">
      <div className="my-5">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          id="username"
          value={data.username}
          className="block shadow rounded-md border border-gray-400 outline-none px-3 py-2 mt-2 w-full"
          onChange={(e) => setData('username', e.target.value)}
        />
        {errors.username && (
          <div className="text-red-500 px-3 py-2 font-medium">
            {errors.username}
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
