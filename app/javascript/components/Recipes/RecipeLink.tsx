import { Link } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import { Section } from "@components/ui";

import RecipeHeader from "./RecipeHeader";

interface RecipeProps {
  recipe: RecipeType;
}

export default function RecipeLink({ recipe }: RecipeProps) {
  return (
    <Link href={`/recipes/${recipe.id}`} className="block">
      <Section className="bg-background p-2 transition-transform hover:scale-102 hover:shadow-md">
        <RecipeHeader recipe={recipe} />
      </Section>
    </Link>
  );
}
