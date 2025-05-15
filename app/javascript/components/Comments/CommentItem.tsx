import UserAvatar from "@components/Users/UserAvatar";
import { formatDateTime } from "@helpers/date-helper";
import { CommentType } from "@customTypes/comment.types";

export default function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className="py-6 flex flex-col gap-2 items-start">
      <div className="flex gap-3">
        <UserAvatar name={comment.user.username} size="md" />
        <div className="flex flex-col">
          <p className=" text-neutral-800">{comment.user.username}</p>
          <p className="text-xs text-neutral-500">
            {formatDateTime(comment.created_at)}
          </p>
        </div>
      </div>
      <p className=" text-neutral-800">{comment.content}</p>
    </div>
  );
}
