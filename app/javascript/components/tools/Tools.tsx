import { Card } from "@components/ui";
import Timer from "./Timer";
import Notes from "./Notes";

export default function Tools({ recipeId }: { recipeId: number }) {
  return (
    <Card>
      <Card.Header>
        <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-600">
            handyman
          </span>
          Outils
        </h2>
      </Card.Header>
      <Card.Body className="grid md:grid-cols-2 gap-2">
        <Timer />
        <Notes recipeId={recipeId} />
      </Card.Body>
    </Card>
  );
}
