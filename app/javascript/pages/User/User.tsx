import { UserType } from './types'

interface UserProps {
  user: UserType
}

export default function User({ user }: UserProps) {
  return (
    <div>
      <p className="my-5">
        <strong className="block font-medium mb-1">Username:</strong>
        {user.username?.toString()}
      </p>
    </div>
  )
}
