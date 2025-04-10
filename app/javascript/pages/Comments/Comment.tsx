import { formatDateTime } from "../../helpers/dateHelper";
import { CommentType } from "./types";

export default function Comment({ comment }: { comment: CommentType }) {
  return (
    <div className="my-4">
      {/* TODO: add user profile pic */}
      <div className="flex gap-2 items-center mb-2">
        <div className="bg-gray-200 w-8 h-8 rounded-full" />
        <div className="flex flex-col">
          <p>{comment.user.username}</p>
          <p className="text-xs text-gray-400 italic">
            {formatDateTime(comment.created_at)}
          </p>
        </div>
      </div>
      <p>{comment.content}</p>
    </div>
  );
}
