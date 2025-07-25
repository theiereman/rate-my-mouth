import { LinkButton, Section, TextArea } from "@components/ui";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <Section title="Notes personnelles" className="w-full" variant="no-padding">
      <div className="flex size-full">
        <TextArea
          className="border-none"
          disabled={isLoading}
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
    </Section>
  );
}
