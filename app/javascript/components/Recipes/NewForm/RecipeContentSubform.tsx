import { Button, Card, Input } from "@components/ui";
import CategoryContainer from "./CategoryContainer";

export default function RecipeContentSubform() {
  return (
    <Card className="space-y-4">
      <div className="flex gap-2 w-full">
        <Input
          containerClassName="flex-1"
          placeholder="new instruction or ingredient"
        ></Input>
        <Button variant="primary">Add ingredient</Button>
        <Button variant="secondary">Add instruction</Button>
      </div>
      <div className="flex gap-4">
        <CategoryContainer type="ingredient"></CategoryContainer>
        <CategoryContainer type="instruction"></CategoryContainer>
      </div>
    </Card>
  );
}
