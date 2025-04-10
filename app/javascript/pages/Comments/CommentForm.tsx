import { useForm } from "@inertiajs/react";
import { CommentableType } from "./types";

export default function CommentForm({
  commentableType,
  commentableId,
  className,
}: {
  commentableType: CommentableType;
  commentableId: number;
  className?: string;
}) {
  const { data, setData, post, processing, errors } = useForm({
    content: "",
  });

  function submit(e) {
    e.preventDefault();
    post(`/${commentableType}/${commentableId}/comments`);
  }

  return (
    <form className={`flex ${className}`} onSubmit={submit}>
      <input
        className="flex-1 border border-gray-300 rounded-md py-1 px-2 me-2 placeholder:italic"
        type="text"
        placeholder="Ajouter un commentaire..."
        value={data.content}
        onChange={(e) => setData("content", e.target.value)}
      />
      {errors.content && <div>{errors.content}</div>}
      <button
        className="rounded-lg py-1 px-5 bg-blue-600 text-white font-medium"
        type="submit"
        disabled={processing}
      >
        Commenter
      </button>
    </form>
  );
}
