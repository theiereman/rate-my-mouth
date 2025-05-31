import { Rating } from "@mui/material";
import { RecipeType } from "@customTypes/recipe.types";
import { Card, Badge, LinkButton } from "@components/ui";
import DifficultyBadge from "@components/Recipes/RecipeDifficulty";
import UserLink from "@components/Users/UserLink";
import IngredientList from "@components/Recipes/Ingredients/IngredientList";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import RecipeThumbnail from "@components/Recipes/RecipeThumbnail";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";

export default function RecipeItem({ recipe }: { recipe: RecipeType }) {
  const { isCurrentUser } = useUserIsCurrentUser(recipe.user);

  return (
    <Card variant="flat" className="p-0!">
      {recipe.thumbnail_url && (
        <RecipeThumbnail thumbnailUrl={recipe.thumbnail_url} className="mb-4" />
      )}

      <div className="mb-4">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              {recipe.name}
            </h1>
            <div className="flex flex-col gap-3">
              <UserLink prefix="par" user={recipe.user} />
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
              <Badge
                text={`${recipe.ratings_count} avis`}
                variant="primary"
              ></Badge>
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
            <Badge
              text={`${recipe.number_of_servings} portions`}
              variant="accent"
              size="md"
            />
            <Badge
              text={`${recipe.ingredients?.length || 0} ingrédients`}
              variant="secondary"
              size="md"
            />
            <Badge
              text={`${recipe.instructions?.length || 0} étapes`}
              variant="primary"
              size="md"
            />
            <DifficultyBadge difficulty={recipe.difficulty_value} />
          </div>
          {recipe.tags && recipe.tags.length > 0 && (
            <div id="tags" className="flex flex-wrap items-start gap-2">
              <h2 className="text-sm italic">Tags : </h2>
              {recipe.tags.map((tag) => (
                <Badge
                  text={tag.name}
                  key={tag.id}
                  variant="neutral"
                  size="md"
                />
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
              <EmptyPlaceholder
                text={`Aucun ingrédient n'a été ajouté à cette recette.`}
              />
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
            {recipe.instructions && recipe.instructions?.length > 0 ? (
              (() => {
                // Grouper les instructions par catégorie
                const groupedInstructions = recipe.instructions.reduce(
                  (groups, instruction) => {
                    const category = instruction.category || "Instructions";
                    if (!groups[category]) {
                      groups[category] = [];
                    }
                    groups[category].push(instruction);
                    return groups;
                  },
                  {} as Record<string, typeof recipe.instructions>
                );

                return (
                  <div className="space-y-6">
                    {Object.entries(groupedInstructions).map(
                      ([category, instructions]) => (
                        <div
                          className="flex flex-col items-start"
                          key={category}
                        >
                          {category !== "Instructions" && (
                            <div className="mb-3">
                              <Badge variant="primary" size="sm">
                                {category}
                              </Badge>
                            </div>
                          )}
                          <ol className="space-y-4 list-none pl-0">
                            {instructions.map((instruction, index) => (
                              <li
                                key={instruction.id || index}
                                className="flex gap-3 group"
                              >
                                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium transition-colors">
                                  {index + 1}
                                </div>
                                <div className="flex-1 pt-1">
                                  <p className="text-neutral-700">
                                    {instruction.name}
                                  </p>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      )
                    )}
                  </div>
                );
              })()
            ) : (
              <EmptyPlaceholder
                text={`Aucune instruction n'a été ajouté à cette recette.`}
              />
            )}
          </Card.Body>
        </Card>
      </Card>
    </Card>
  );
}
