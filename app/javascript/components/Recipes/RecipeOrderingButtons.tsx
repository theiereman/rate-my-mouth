import { Button } from "@components/ui";
import { OrderingOption } from "@customTypes/recipe.types";

export default function RecipeOrderingButtons({
  selectedOrderingOption,
  onOrderingOptionChange,
  disabled,
}: {
  selectedOrderingOption: OrderingOption;
  onOrderingOptionChange: (option: OrderingOption) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex gap-2">
      <Button
        disabled={selectedOrderingOption === OrderingOption.Recent || disabled}
        onClick={() => onOrderingOptionChange(OrderingOption.Recent)}
      >
        Récentes
      </Button>
      <Button
        disabled={selectedOrderingOption === OrderingOption.Popular || disabled}
        onClick={() => onOrderingOptionChange(OrderingOption.Popular)}
      >
        Populaires
      </Button>
      <Button
        disabled={
          selectedOrderingOption === OrderingOption.TopRated || disabled
        }
        onClick={() => onOrderingOptionChange(OrderingOption.TopRated)}
      >
        Mieux notées
      </Button>
    </div>
  );
}
