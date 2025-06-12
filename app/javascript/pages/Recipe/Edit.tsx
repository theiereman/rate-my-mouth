import { Head } from "@inertiajs/react";
import Form from "@components/Recipes/Form/RecipeForm";
import { RecipeType } from "@customTypes/recipe.types";

interface EditProps {
  recipe: RecipeType;
}

export default function Edit({ recipe }: EditProps) {
  return (
    <>
      <Form
        title={`Modification de la recette`}
        recipe={recipe}
        onSubmit={(form) => {
          form.transform((data) => ({ recipe: data }));
          form.patch(`/recipes/${recipe.id}`);
        }}
        submitText="Mettre à jour la recette"
      />
    </>
  );
}
