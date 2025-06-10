import { CommentType } from "@customTypes/comment.types";
import UserRelatedEventHeader from "@components/Users/UserRelatedEventHeader";

export default function CommentItem({ comment }: { comment: CommentType }) {
  return (
    <div className="flex py-4 flex-col items-start">
      <UserRelatedEventHeader
        user={comment.user}
        eventTimestamp={comment.created_at}
      />
      <p className=" text-neutral-800">{comment.content}</p>
    </div>
  );
}
