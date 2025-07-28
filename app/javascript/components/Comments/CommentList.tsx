import Comment from "@components/Comments/CommentItem";
import { EmptyPlaceholder } from "@components/ui";
import { CommentType } from "@customTypes/comment.types";

export default function CommentList({ comments }: { comments: CommentType[] }) {
  const sortedComments = [...comments].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  );

  return (
    <>
      {sortedComments.length > 0 ? (
        <ul className="divide-primary-900/20 divide-y">
          {sortedComments.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPlaceholder>Aucun commentaire pour le moment</EmptyPlaceholder>
      )}
    </>
  );
}
