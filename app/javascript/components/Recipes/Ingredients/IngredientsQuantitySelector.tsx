export default function IngredientsQuantitySelector({
  numberOfServings = 1,
  onValueIncrease,
  onValueDecrease,
}: {
  numberOfServings?: number;
  onValueIncrease: () => void;
  onValueDecrease: () => void;
}) {
  return (
    <div className="flex gap-2 mb-2">
      <h2>
        Quantités pour {numberOfServings}{" "}
        <span className="inline-flex gap-1">
          <button
            className="bg-primary-100 size-6 rounded-full hover:bg-primary-200 hover:cursor-pointer"
            onClick={onValueDecrease}
          >
            -
          </button>
          <button
            className="bg-primary-100 size-6 rounded-full hover:bg-primary-200 hover:cursor-pointer"
            onClick={onValueIncrease}
          >
            +
          </button>
        </span>{" "}
        personne
        {numberOfServings > 1 ? "s" : ""}
      </h2>
    </div>
  );
}
