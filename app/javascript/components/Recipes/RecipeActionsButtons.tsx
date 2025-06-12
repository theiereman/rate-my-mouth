import { LinkButton } from "@components/ui";
import { RecipeType } from "@customTypes/recipe.types";

export default function RecipeActionsButtons({
  recipe,
}: {
  recipe: RecipeType;
}) {
  return (
    <div className="flex flex-col md:flex-row gap-2">
      <LinkButton
        href={`/recipes/${recipe.id}/edit`}
        variant="outline"
        icon={
          <span className="material-symbols-outlined material-icon--sm">
            edit
          </span>
        }
        className="text-sm py-1!"
      >
        Modifier
      </LinkButton>
      <LinkButton
        href={`/recipes/${recipe.id}`}
        method="delete"
        variant="outline"
        onBefore={() =>
          confirm("Êtes-vous sûr de vouloir supprimer cette recette?")
        }
        icon={
          <span className="material-symbols-outlined material-icon--sm">
            delete
          </span>
        }
        className="text-sm py-1!"
      >
        Supprimer
      </LinkButton>
    </div>
  );
}
