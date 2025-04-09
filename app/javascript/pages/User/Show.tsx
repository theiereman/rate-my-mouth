import { Head, Link } from '@inertiajs/react'
import User from './User'
import { UserType } from './types'

interface ShowProps {
  user: UserType
  flash: { notice?: string }
}

export default function Show({ user, flash }: ShowProps) {
  return (
    <>
      <Head title={`User #${user.id}`} />

      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        <div className="mx-auto">
          {flash.notice && (
            <p className="py-2 px-3 bg-green-50 mb-5 text-green-500 font-medium rounded-lg inline-block">
              {flash.notice}
            </p>
          )}

          <h1 className="font-bold text-4xl">User #{user.id}</h1>

          <User user={user} />

          <Link
            href={`/users/${user.id}/edit`}
            className="mt-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
          >
            Edit this user
          </Link>
          <Link
            href="/users"
            className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
          >
            Back to users
          </Link>
          <div className="inline-block ml-2">
            <Link
              href={`/users/${user.id}`}
              as="button"
              method="delete"
              className="mt-2 rounded-lg py-3 px-5 bg-gray-100 font-medium"
            >
              Destroy this user
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
