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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M10 2c-2.236 0-4.43.18-6.57.524C1.993 2.755 1 4.014 1 5.426v5.148c0 1.413.993 2.67 2.43 2.902 1.168.188 2.352.327 3.55.414.28.02.521.18.642.413l1.713 3.293a.75.75 0 001.33 0l1.713-3.293a.783.783 0 01.642-.413 41.102 41.102 0 003.55-.414c1.437-.231 2.43-1.49 2.43-2.902V5.426c0-1.413-.993-2.67-2.43-2.902A41.289 41.289 0 0010 2zM6.75 6a.75.75 0 000 1.5h6.5a.75.75 0 000-1.5h-6.5zm0 2.5a.75.75 0 000 1.5h3.5a.75.75 0 000-1.5h-3.5z"
                clipRule="evenodd"
              />
            </svg>
          }
        />
      </div>
      <Button variant="primary" size="md" isLoading={processing} type="submit">
        Commenter
      </Button>
    </form>
  );
}
