import { Head } from "@inertiajs/react";
import Form from "./Form";
import { RecipeType } from "./types";
import { LinkButton } from "../../components/ui";

interface EditProps {
  recipe: RecipeType;
}

export default function Edit({ recipe }: EditProps) {
  return (
    <>
      <Head title="Modification de la recette" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <LinkButton
            href={`/recipes/${recipe.id}`}
            variant="ghost"
            size="sm"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path
                  fillRule="evenodd"
                  d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
                  clipRule="evenodd"
                />
              </svg>
            }
          >
            Retour à la recette
          </LinkButton>
        </div>
      </div>

      <div className="mx-auto flex flex-col gap-8 animate-fade-in">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">
                Modification de la recette
              </h1>
            </div>
          </div>
        </div>

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
