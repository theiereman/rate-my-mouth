import { CommentType } from "@customTypes/comment.types";
import UserRelatedEventHeader from "@components/Users/UserRelatedEventHeader";

export default function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className="flex flex-col items-start py-3">
      <UserRelatedEventHeader
        user={comment.user}
        eventTimestamp={comment.created_at}
      />
      <p className="text-neutral-800">{comment.content}</p>
    </div>
  );
}
