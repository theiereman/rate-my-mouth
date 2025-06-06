import { CommentableType, CommentType } from "@customTypes/comment.types";
import CommentForm from "@components/Comments/Form/CommentForm";
import Comment from "@components/Comments/CommentItem";
import Section from "@components/ui/Pages/Section";

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
        <div className="pb-2">
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
        <div className="py-8 text-center">
          <span className="material-symbols-outlined material-symbols-filled text-primary-600 material-icon--lg">
            mode_comment
          </span>
          <p className="text-neutral-600">Aucun commentaire pour le moment</p>
          {commentableId && commentableType && (
            <p className="text-neutral-500 text-sm mt-1">
              Soyez le premier à commenter !
            </p>
          )}
        </div>
      )}
    </Section>
  );
}
