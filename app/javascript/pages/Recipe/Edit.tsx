import { Head } from "@inertiajs/react";
import RecipeForm from "@components/Recipes/Form/RecipeForm";
import { RecipeType } from "@customTypes/recipe.types";

interface EditProps {
  recipe: RecipeType;
}

export default function Edit({ recipe }: EditProps) {
  return (
    <>
      <Head title="Modification de la recette" />

      <div className="mx-auto flex flex-col gap-8 animate-fade-in">
        <h1 className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-3xl font-bold text-neutral-800">
          Modification de la recette
        </h1>

        <RecipeForm
          recipe={recipe}
          onSubmit={(form) => {
            form.transform((data) => ({ recipe: data }));
            form.patch(`/recipes/${recipe.id}`);
          }}
          submitText="Mettre à jour la recette"
        />
      </div>
    </>
  );
}
