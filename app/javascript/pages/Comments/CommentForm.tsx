import { useForm } from "@inertiajs/react";

export default function CommentForm({ recipeId }: { recipeId: number }) {
  const { data, setData, post, processing, errors } = useForm({
    content: "",
  });

  function submit(e) {
    e.preventDefault();
    post(`/recipes/${recipeId}/comments`);
  }

  return (
    <form onSubmit={submit}>
      <input
        className="border border-gray-300 rounded-md py-1 px-2 me-2 placeholder:italic"
        type="text"
        placeholder="Commentaire..."
        value={data.content}
        onChange={(e) => setData("content", e.target.value)}
      />
      {errors.content && <div>{errors.content}</div>}
      <button
        className="rounded-lg py-1 px-5 bg-blue-600 text-white font-medium"
        type="submit"
        disabled={processing}
      >
        Envoyer
      </button>
    </form>
  );
}
