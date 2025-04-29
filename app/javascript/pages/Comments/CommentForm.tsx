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
  const { data, setData, post, processing, errors, reset } = useForm({
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
    post(`/${commentableType}/${commentableId}/comments`, {
      preserveScroll: true,
    });
    reset();
  }

  return (
    <form
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
      onSubmit={submit}
    >
      <div className="flex-1">
        <Input
          fullWidth
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
      <button
        type="submit"
        disabled={processing}
        className="inline-flex items-center justify-center px-4 py-2 font-medium rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-sm transition-colors duration-200"
      >
        {processing ? (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5 mr-2"
          >
            <path d="M3.105 2.289a.75.75 0 00-.826.95l1.414 4.925A1.5 1.5 0 005.135 9.25h6.115a.75.75 0 010 1.5H5.135a1.5 1.5 0 00-1.442 1.086l-1.414 4.926a.75.75 0 00.826.95 28.896 28.896 0 0015.293-7.154.75.75 0 000-1.115A28.897 28.897 0 003.105 2.289z" />
          </svg>
        )}
        Commenter
      </button>
    </form>
  );
}
