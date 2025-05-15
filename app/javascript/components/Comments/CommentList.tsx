import { CommentableType, CommentType } from "@customTypes/comment.types";
import CommentForm from "@components/Comments/Form/CommentForm";
import Comment from "@components/Comments/CommentItem";
import { Card } from "@components/ui";

export default function CommentList({
  comments,
  commentableType,
  commentableId,
  className,
}: {
  comments: CommentType[];
  commentableType?: CommentableType;
  commentableId?: number;
  className?: string;
}) {
  const sortedComments = [...comments].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <Card className={className}>
      <Card.Header>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-600">
              comment
            </span>
            Commentaires
            <span className="ml-1 text-sm font-normal text-neutral-500">
              ({comments.length})
            </span>
          </h2>
        </div>
      </Card.Header>

      {commentableId && commentableType && (
        <div className="pb-2">
          <CommentForm
            commentableId={commentableId}
            commentableType={commentableType}
          />
        </div>
      )}

      <Card.Body className="p-0">
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
      </Card.Body>
    </Card>
  );
}
