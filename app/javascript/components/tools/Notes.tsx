import { Card, LinkButton, TextArea } from "@components/ui";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Notes({ recipeId }: { recipeId: number }) {
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        //fake timeout to test loadin
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(
          `/recipes/${recipeId}/notes/show_for_user`
        );
        setNotes(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <Card className="flex flex-col h-full">
      <Card.Header className="flex">
        <h2 className="flex-1 text-xl font-semibold text-neutral-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-600">
            notes
          </span>
          Notes perso.
        </h2>
        <LinkButton
          onBefore={() => setIsLoading(true)}
          onSuccess={() => setIsLoading(false)}
          isLoading={isLoading}
          method="patch"
          href={`/recipes/${recipeId}/notes/update_for_user`}
          data={{ notes: notes }}
          preserveScroll
          preserveState
          icon={<span className="material-symbols-outlined">save</span>}
        >
          Enregistrer
        </LinkButton>
      </Card.Header>
      <Card.Body className="flex-1">
        <TextArea
          rows={0}
          disabled={isLoading}
          containerClassName="h-full"
          textareaClassName={`${
            isLoading ? "text-neutral-400 italic" : ""
          } h-full resize-none`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></TextArea>
      </Card.Body>
    </Card>
  );
}
