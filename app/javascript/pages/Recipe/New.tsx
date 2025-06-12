import Form from "@components/Recipes/Form/RecipeForm";
import { RecipeType } from "@customTypes/recipe.types";

interface NewProps {
  recipe: RecipeType;
}

export default function New({ recipe }: NewProps) {
  return (
    <Form
      title="Nouvelle recette"
      recipe={recipe}
      onSubmit={(form) => {
        form.transform((data) => ({ recipe: data }));
        form.post("/recipes");
      }}
      submitText="Créer la recette"
    />
  );
}
