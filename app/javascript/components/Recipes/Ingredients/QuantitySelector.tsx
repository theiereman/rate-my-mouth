export default function QuantitySelector({
  onValueIncrease,
  onValueDecrease,
}: {
  onValueIncrease: () => void;
  onValueDecrease: () => void;
}) {
  return (
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
    </span>
  );
}
