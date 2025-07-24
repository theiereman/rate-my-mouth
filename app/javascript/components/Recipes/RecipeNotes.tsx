import { LinkButton, TextArea } from "@components/ui";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";

export default function RecipeNotes({ recipeId }: { recipeId: number }) {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `/recipes/${recipeId}/notes/show_for_user`,
        );
        setNotes(response.data ?? "");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="flex gap-2">
      <TextArea
        rows={0}
        disabled={isLoading}
        containerClassName="h-full"
        textareaClassName={`${
          isLoading ? "text-neutral-400 italic" : ""
        } h-full resize-none`}
        value={isLoading ? "Chargement..." : notes}
        onChange={(e) => setNotes(e.target.value)}
      />

      <LinkButton
        onBefore={() => setIsLoading(true)}
        onSuccess={() => setIsLoading(false)}
        isLoading={isLoading}
        method="patch"
        href={`/recipes/${recipeId}/notes/update_for_user`}
        data={{ notes: notes }}
      >
        <span className="material-symbols-outlined">save</span>
      </LinkButton>
    </div>
  );
}
