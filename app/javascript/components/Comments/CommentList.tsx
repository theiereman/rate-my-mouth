import { CommentableType, CommentType } from "@customTypes/comment.types";
import CommentForm from "@components/Comments/Form/CommentForm";
import Comment from "@components/Comments/CommentItem";
import Section from "@components/ui/Pages/Section";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";

export default function CommentList({
  comments,
  commentableType,
  commentableId,
}: {
  comments: CommentType[];
  commentableType?: CommentableType;
  commentableId?: number;
}) {
  const sortedComments = [...comments].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <Section title="Commentaires" underlineStroke={1}>
      {commentableId && commentableType && (
        <div className="mb-4">
          <CommentForm
            commentableId={commentableId}
            commentableType={commentableType}
          />
        </div>
      )}
      {sortedComments.length > 0 ? (
        <ul className="divide-y divide-neutral-200">
          {sortedComments.map((comment) => (
            <li key={comment.id}>
              <Comment comment={comment} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyPlaceholder text="Aucun commentaire pour le moment" />
      )}
    </Section>
  );
}
