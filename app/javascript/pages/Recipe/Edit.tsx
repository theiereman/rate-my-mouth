import { Head } from "@inertiajs/react";
import Form from "./Form";
import { RecipeType } from "./types";
import { LinkButton } from "../../components";

interface EditProps {
  recipe: RecipeType;
}

export default function Edit({ recipe }: EditProps) {
  return (
    <>
      <Head title="Modification de la recette" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <LinkButton
          href={`/recipes/${recipe.id}`}
          variant="ghost"
          size="sm"
          icon={<span className="material-symbols-outlined ">arrow_back</span>}
        >
          Retour à la recette
        </LinkButton>
      </div>

      <div className="mx-auto flex flex-col gap-8 animate-fade-in">
        <h1 className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-3xl font-bold text-neutral-800">
          Modification de la recette
        </h1>

        <Form
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
