import { Head, Link } from '@inertiajs/react'
import Form from './Form'
import { UserType } from './types'

interface EditProps {
  user: UserType
}

export default function Edit({ user }: EditProps) {
  return (
    <>
      <Head title="Editing user" />

      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <h1 className="font-bold text-4xl">Editing user</h1>

        <Form
          user={user}
          onSubmit={(form) => {
            form.transform((data) => ({ user: data }))
            form.patch(`/users/${user.id}`)
          }}
          submitText="Update User"
        />

        <Link
          href={`/users/${user.id}`}
          className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
        >
          Show this user
        </Link>
        <Link
          href="/users"
          className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
        >
          Back to users
        </Link>
      </div>
    </>
  )
}
