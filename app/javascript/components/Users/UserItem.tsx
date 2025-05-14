import { UserType } from "@customTypes/user.types";

interface UserProps {
  user: UserType;
}

export default function UserItem({ user }: UserProps) {
  return (
    <div>
      <p className="my-5">
        <strong className="block font-medium mb-1">Username:</strong>
        {user.username?.toString()}
      </p>
    </div>
  );
}
