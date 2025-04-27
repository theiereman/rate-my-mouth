import { useForm } from "@inertiajs/react";
import { CommentableType } from "./types";
import { COMMENTS_PLACEHOLDERS } from "../../helpers/commentsPlaceholders";
import { useState, useEffect } from "react";

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

  const [placeholder, setPlaceholder] = useState("");

  // Définir le placeholder une seule fois à l'initialisation du composant
  useEffect(() => {
    setPlaceholder(
      COMMENTS_PLACEHOLDERS[
        Math.floor(Math.random() * COMMENTS_PLACEHOLDERS.length)
      ]
    );
  }, []);

  function submit(event) {
    event.preventDefault();
    post(`/${commentableType}/${commentableId}/comments`);
  }

  return (
    <form className={`flex ${className}`} onSubmit={submit}>
      <input
        className="flex-1 border border-gray-300 rounded-md py-1 px-2 me-2 placeholder:italic"
        type="text"
        placeholder={`${placeholder}...`}
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
