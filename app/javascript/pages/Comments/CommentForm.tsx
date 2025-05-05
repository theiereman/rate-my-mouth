import { useForm } from "@inertiajs/react";
import { CommentableType } from "./types";
import { COMMENTS_PLACEHOLDERS } from "../../helpers/commentsPlaceholders";
import { useState, useEffect } from "react";
import { Button, Input } from "../../components/ui";

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

  function submit(event: any) {
    event.preventDefault();
    post(`/${commentableType}/${commentableId}/comments`, {
      preserveScroll: true,
    });
    setData("content", "");
  }

  return (
    <form
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
      onSubmit={submit}
    >
      <div className="flex-1">
        <Input
          placeholder={`${placeholder}...`}
          value={data.content}
          onChange={(e) => setData("content", e.target.value)}
          error={errors.content}
          leftIcon={
            <span className="material-symbols-outlined text-primary-600">
              edit_note
            </span>
          }
        />
      </div>
      <Button variant="primary" size="md" isLoading={processing} type="submit">
        Commenter
      </Button>
    </form>
  );
}
