import { formatDateTime } from "@helpers/date-helper";
import UserAvatar from "./UserAvatar";
import UserLink from "./UserLink";
import { UserType } from "@customTypes/user.types";

export default function UserRelatedEventHeader({
  user,
  eventTimestamp,
}: {
  user: UserType;
  eventTimestamp: string;
}) {
  return (
    <div className="flex gap-3 mb-2">
      <UserAvatar user={user} size="md" />
      <div className="flex flex-col">
        <UserLink className="flex-1" user={user} />
        <p className="text-xs text-neutral-500">
          {formatDateTime(eventTimestamp)}
        </p>
      </div>
    </div>
  );
}
