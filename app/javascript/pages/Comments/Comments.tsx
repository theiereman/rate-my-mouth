import { CommentableType, CommentType } from "./types";
import CommentForm from "./CommentForm";
import Comment from "./Comment";

export default function Comments({
  comments,
  commentableType,
  commentableId,
}: {
  comments: CommentType[];
  commentableType?: CommentableType;
  commentableId?: number;
}) {
  return (
    <div id="comments">
      <h2 className="font-bold">Commentaires ({comments.length})</h2>
      {commentableId && commentableType && (
        <CommentForm
          className="my-8 mt-4"
          commentableId={commentableId}
          commentableType={commentableType}
        />
      )}
      {comments.length > 0 ? (
        <ul>
          {comments
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((comment) => (
              <>
                <Comment key={comment.id} comment={comment} />
                <div id="separator" className="h-[1px] bg-gray-200"></div>
              </>
            ))}
        </ul>
      ) : (
        <p>Aucun commentaire</p>
      )}
    </div>
  );
}
