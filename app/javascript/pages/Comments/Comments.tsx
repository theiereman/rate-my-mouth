import { CommentType } from "../types";

export default function Comments({ comments }: { comments: CommentType[] }) {
  return (
    <>
      <h2 className="font-bold text-2xl mt-8">Commentaires</h2>
      {comments.length > 0 ? (
        <ul className="list-disc list-inside">
          {comments.map((comment) => (
            <li key={comment.id} className="my-2">
              <strong>{comment.user.username}</strong>: {comment.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun commentaire</p>
      )}
    </>
  );
}
