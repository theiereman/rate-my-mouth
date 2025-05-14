import UserAvatar from "@components/Users/UserAvatar";
import { formatDateTime } from "@helpers/date-helper";
import { CommentType } from "@customTypes/comment.types";

export default function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className="py-4 animate-fade-in">
      <div className="flex gap-3 items-start mb-3">
        <UserAvatar name={comment.user.username} size="md" />
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <p className="font-medium text-neutral-800">
              {comment.user.username}
            </p>
            <p className="text-xs text-neutral-500">
              {formatDateTime(comment.created_at)}
            </p>
          </div>
          <p className="mt-2 text-neutral-700">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
