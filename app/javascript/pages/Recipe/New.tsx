import { Head } from "@inertiajs/react";
import Form from "@components/Recipes/Form/RecipeForm";
import { RecipeType } from "@customTypes/recipe.types";
import { LinkButton } from "@components/ui";

interface NewProps {
  recipe: RecipeType;
}

export default function New({ recipe }: NewProps) {
  return (
    <Form
      title="Créer une nouvelle recette"
      recipe={recipe}
      onSubmit={(form) => {
        form.transform((data) => ({ recipe: data }));
        form.post("/recipes");
      }}
      submitText="Créer la recette"
    />
  );
}
