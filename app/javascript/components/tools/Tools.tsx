import { Card } from "@components/ui";
import Timer from "./Timer";

export default function Tools() {
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
      </Card.Body>
    </Card>
  );
}
