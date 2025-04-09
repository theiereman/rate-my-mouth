import { Head, Link } from '@inertiajs/react'
import { Fragment } from 'react'
import User from './User'
import { UserType } from './types'

interface IndexProps {
  users: UserType[]
  flash: { notice?: string }
}

export default function Index({ users, flash }: IndexProps) {
  return (
    <>
      <Head title="Users" />
      <div className="mx-auto md:w-2/3 w-full px-8 pt-8">
        {flash.notice && (
          <p className="py-2 px-3 bg-green-50 mb-5 text-green-500 font-medium rounded-lg inline-block">
            {flash.notice}
          </p>
        )}
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-4xl">Users</h1>
          <Link
            href="/users/new"
            className="rounded-lg py-3 px-5 bg-blue-600 text-white block font-medium"
          >
            New user
          </Link>
        </div>

        <div className="min-w-full">
          {users.map((user) => (
            <Fragment key={user.id}>
              <User user={user} />
              <p>
                <Link
                  href={`/users/${user.id}`}
                  className="ml-2 rounded-lg py-3 px-5 bg-gray-100 inline-block font-medium"
                >
                  Show this user
                </Link>
              </p>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  )
}
