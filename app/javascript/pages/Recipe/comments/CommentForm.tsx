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
        type="text"
        value={data.content}
        onChange={(e) => setData("content", e.target.value)}
      />
      {errors.content && <div>{errors.content}</div>}
      <button type="submit" disabled={processing}>
        Envoyer
      </button>
    </form>
  );
}
