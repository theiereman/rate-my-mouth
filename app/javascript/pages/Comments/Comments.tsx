import { CommentableType, CommentType } from "./types";
import CommentForm from "./CommentForm";
import Comment from "./Comment";
import { Card } from "../../components/ui";

export default function Comments({
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
    <Card variant="outlined" className="mt-8">
      <Card.Header>
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-primary-600"
            >
              <path
                fillRule="evenodd"
                d="M4.804 21.644A6.707 6.707 0 006 21.75a6.721 6.721 0 003.583-1.029c.774.182 1.584.279 2.417.279 5.322 0 9.75-3.97 9.75-9 0-5.03-4.428-9-9.75-9s-9.75 3.97-9.75 9c0 2.409 1.025 4.587 2.674 6.192.232.226.277.428.254.543a3.73 3.73 0 01-.814 1.686.75.75 0 00.44 1.223zM8.25 10.875a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25zM10.875 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875-1.125a1.125 1.125 0 100 2.25 1.125 1.125 0 000-2.25z"
                clipRule="evenodd"
              />
            </svg>
            Commentaires
            <span className="ml-1 text-sm font-normal text-neutral-500">
              ({comments.length})
            </span>
          </h2>
        </div>
      </Card.Header>

      {commentableId && commentableType && (
        <div className="px-6 py-4 border-b border-neutral-200">
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
              <li key={comment.id} className="px-6">
                <Comment comment={comment} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-8 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-neutral-300 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
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
