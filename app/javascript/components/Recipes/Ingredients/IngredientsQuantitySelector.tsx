import { Button } from "@components/ui";

export default function IngredientsQuantitySelector({
  numberOfServings = 1,
  onValueIncrease,
  onValueDecrease,
  onValueReset,
  className,
  isValueChanged = false,
}: {
  numberOfServings?: number;
  onValueIncrease: () => void;
  onValueDecrease: () => void;
  onValueReset: () => void;
  isValueChanged?: boolean;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-2 font-bold ${className}`}>
      <span>{`${numberOfServings} ${numberOfServings > 1 ? "personnes" : "personne"}`}</span>
      {isValueChanged && (
        <Button
          className={`bg-background! text-primary-900 hover:bg-primary-800! p-0! text-4xl`}
          onClick={onValueReset}
        >
          <span className="material-symbols-outlined">undo</span>
        </Button>
      )}
      <Button
        className={`bg-background! text-primary-900 hover:bg-primary-800! p-0! text-4xl`}
        onClick={onValueDecrease}
      >
        <span className="material-symbols-outlined">remove</span>
      </Button>
      <Button
        className={`bg-background! text-primary-900 hover:bg-primary-800! p-0! text-4xl`}
        onClick={onValueIncrease}
      >
        <span className="material-symbols-outlined">add</span>
      </Button>
    </div>
  );
}
