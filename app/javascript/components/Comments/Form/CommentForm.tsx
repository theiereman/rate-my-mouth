import { useForm } from "@inertiajs/react";
import { CommentableType } from "@customTypes/comment.types";
import { COMMENTS_PLACEHOLDERS } from "@const/comments-placeholders";
import { useState, useEffect } from "react";
import { Button, Input } from "@components/ui";

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
      ],
    );
  }, []);

  function submit(event: any) {
    event.preventDefault();
    if (processing || !data.content.trim()) return;
    post(`/${commentableType}/${commentableId}/comments`, {
      preserveScroll: true,
    });
    setData("content", "");
  }

  return (
    <form
      className={`flex flex-col items-stretch gap-3 sm:flex-row ${className}`}
      onSubmit={submit}
    >
      <Input
        className="flex-1"
        placeholder={`${placeholder}...`}
        value={data.content}
        onChange={(e) => setData("content", e.target.value)}
        error={errors.content}
      />
      <Button disabled={processing} type="submit">
        Commenter
      </Button>
    </form>
  );
}
