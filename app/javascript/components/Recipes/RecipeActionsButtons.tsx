import { LinkButton } from "@components/ui";
import { RecipeType } from "@customTypes/recipe.types";

export default function RecipeActionsButtons({
  recipe,
}: {
  recipe: RecipeType;
}) {
  return (
    <div className="flex flex-col gap-2 md:flex-row">
      <LinkButton href={`/recipes/${recipe.id}/edit`}>Modifier</LinkButton>
      <LinkButton
        href={`/recipes/${recipe.id}`}
        method="delete"
        onBefore={() =>
          confirm("Êtes-vous sûr de vouloir supprimer cette recette?")
        }
      >
        Supprimer
      </LinkButton>
    </div>
  );
}
