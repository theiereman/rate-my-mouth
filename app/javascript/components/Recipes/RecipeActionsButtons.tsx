import { LinkButton } from "@components/ui";
import { RecipeType } from "@customTypes/recipe.types";

export default function RecipeActionsButtons({
  recipe,
}: {
  recipe: RecipeType;
}) {
  return (
    <div className="flex gap-2">
      <LinkButton
        href={`/recipes/${recipe.id}/edit`}
        variant="outline"
        size="xs"
        icon={<span className="material-symbols-outlined">edit</span>}
      >
        Modifier
      </LinkButton>
      <LinkButton
        href={`/recipes/${recipe.id}`}
        method="delete"
        variant="outline"
        size="xs"
        onBefore={() =>
          confirm("Êtes-vous sûr de vouloir supprimer cette recette?")
        }
        icon={<span className="material-symbols-outlined">delete</span>}
      >
        Supprimer
      </LinkButton>
    </div>
  );
}
