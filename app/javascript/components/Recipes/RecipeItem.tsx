import { Rating } from "@mui/material";
import { RecipeType } from "@customTypes/recipe.types";
import { Card, Badge, LinkButton } from "@components/ui";
import DifficultyBadge from "@components/Recipes/RecipeDifficulty";
import UserLink from "@components/Users/UserLink";
import IngredientList from "@components/Recipes/Ingredients/IngredientList";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";

export default function RecipeItem({ recipe }: { recipe: RecipeType }) {
  const { isCurrentUser } = useUserIsCurrentUser(recipe.user);

  return (
    <Card variant="flat" className="p-0!">
      {recipe.thumbnail_url && (
        <RecipeThumbnail
          thumbnailUrl={recipe.thumbnail_url}
          size="md"
          className="mb-4"
        />
      )}

      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              {recipe.name}
            </h1>
            <div className="flex items-center gap-3">
              <span className="text-neutral-600">
                Par <UserLink user={recipe.user} />
              </span>
              {recipe.url && (
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-primary-600">
                    open_in_new
                  </span>
                  Source originale
                </a>
              )}
            </div>
          </div>

          <div className="flex md:items-end flex-col gap-2">
            <div className="flex flex-1 gap-2 items-center">
              <Rating
                value={recipe.average_rating}
                readOnly
                precision={0.5}
                size="large"
              />
              <span className="text-lg font-medium text-neutral-700">
                {recipe.average_rating.toFixed(1)}
              </span>
              <Badge variant="primary" size="sm">
                {recipe.ratings.length} avis
              </Badge>
            </div>

            {isCurrentUser && (
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
                  icon={
                    <span className="material-symbols-outlined">delete</span>
                  }
                >
                  Supprimer
                </LinkButton>
              </div>
            )}
          </div>
        </div>

        <pre className="text-neutral-600 italic font-sans mb-4 text-wrap">
          {recipe.description}
        </pre>

        <div className="flex flex-col gap-4">
          <div id="badges" className="flex-1 flex flex-wrap gap-2">
            <Badge variant="accent" size="md">
              {recipe.number_of_servings} portions
            </Badge>
            <Badge variant="secondary" size="md">
              {recipe.ingredients?.length || 0} ingrédients
            </Badge>
            <Badge variant="primary" size="md">
              {recipe.instructions?.length || 0} étapes
            </Badge>
            <DifficultyBadge difficulty={recipe.difficulty_value} />
          </div>
          {recipe.tags && recipe.tags.length > 0 && (
            <div id="tags" className="flex flex-wrap items-start gap-2">
              <h2 className="text-sm italic">Tags : </h2>
              {recipe.tags.map((tag) => (
                <Badge key={tag.id} variant="neutral" size="md">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </div>

      <Card className="space-y-8 lg:space-y-0 lg:flex gap-4">
        <Card variant="flat" className="flex-1 p-0!">
          <Card.Header>
            <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">
                grocery
              </span>
              Ingrédients
            </h2>
          </Card.Header>
          <Card.Body className="space-y-2">
            {recipe.ingredients && recipe.ingredients?.length > 0 ? (
              <IngredientList recipe={recipe} />
            ) : (
              <div className="text-center py-4 bg-neutral-50 rounded-lg border border-neutral-100">
                <p className="text-sm text-neutral-600">
                  Aucun ingrédient n&apos;a été ajouté à cette recette.
                </p>
              </div>
            )}
          </Card.Body>
        </Card>

        <Card variant="flat" className="flex-2 p-0!">
          <Card.Header>
            <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">
                density_medium
              </span>
              Instructions
            </h2>
          </Card.Header>
          <Card.Body>
            <ol className="space-y-4 list-none pl-0">
              {recipe.instructions && recipe.instructions?.length > 0 ? (
                recipe.instructions?.map((instruction, index) => (
                  <li key={index} className="flex gap-3 group">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium transition-colors">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="text-neutral-700">{instruction}</p>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-4 bg-neutral-50 rounded-lg border border-neutral-100">
                  <p className="text-sm text-neutral-600">
                    Aucune instruction n&apos;a été ajouté à cette recette.
                  </p>
                </div>
              )}
            </ol>
          </Card.Body>
        </Card>
      </Card>
    </Card>
  );
}
