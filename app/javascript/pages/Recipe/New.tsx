import { Head } from "@inertiajs/react";
import Form from "@components/Recipes/Form/RecipeForm";
import { RecipeType } from "@customTypes/recipe.types";
import { LinkButton } from "@components/ui";
import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";

interface NewProps {
  recipe: RecipeType;
}

export default function New({ recipe }: NewProps) {
  return (
    <>
      <Head title="Nouvelle recette" />

      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <LinkButton
          href="/recipes"
          variant="ghost"
          size="sm"
          icon={<span className="material-symbols-outlined">arrow_back</span>}
        >
          Retour aux recettes
        </LinkButton>
      </div>

      <div className="mx-auto flex flex-col gap-8 animate-fade-in">
        <div>
          <h1 className="text-3xl font-bold text-neutral-800 mb-2">
            Nouvelle recette
          </h1>
          <p className="text-neutral-600">
            Partagez votre recette avec la communauté
          </p>
        </div>

        <div className="mb-2">
          <h2 className="text-lg font-medium text-neutral-800 mb-3">
            Miniature de la recette
          </h2>
          <RecipeThumbnail recipe={recipe} allowThumbnailChange={true} />
        </div>

        <Form
          recipe={recipe}
          onSubmit={(form) => {
            form.transform((data) => ({ recipe: data }));
            form.post("/recipes");
          }}
          submitText="Créer la recette"
        />
      </div>
    </>
  );
}
