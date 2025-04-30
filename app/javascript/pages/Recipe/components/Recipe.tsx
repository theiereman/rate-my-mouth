import { Rating } from "@mui/material";
import { RecipeType } from "../types";
import Ingredients from "../Ingredients/components/Ingredients";
import { Card, Badge, LinkButton } from "../../../components/ui";
import { usePage } from "@inertiajs/react";
import { PageProps } from "../../../types";

export default function Recipe({
  recipe,
  showRating = false,
}: {
  recipe: RecipeType;
  showRating?: boolean;
}) {
  const { user } = usePage<PageProps>().props;

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              {recipe.name}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-neutral-600">
                Par <span className="font-medium">{recipe.user.username}</span>
              </p>
              {recipe.url && (
                <a
                  href={recipe.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 transition-colors flex items-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                      clipRule="evenodd"
                    />
                    <path
                      fillRule="evenodd"
                      d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Source originale
                </a>
              )}
            </div>
          </div>

          {showRating && (
            <div className="flex gap-2 items-center">
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
          )}
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          <Badge variant="accent" size="md">
            {recipe.number_of_servings} portions
          </Badge>
          <Badge variant="secondary" size="md">
            {recipe.ingredients?.length || 0} ingrédients
          </Badge>
          <Badge variant="primary" size="md">
            {recipe.instructions?.length || 0} étapes
          </Badge>
        </div>
      </div>

      <Card variant="outlined" padding="sm">
        <Card variant="flat" className="h-fit">
          <Card.Header>
            <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-primary-600"
              >
                <path d="M11.25 3v4.046a3 3 0 00-4.277 4.204H1.5v-6A2.25 2.25 0 013.75 3h7.5zM12.75 3v4.011a3 3 0 014.239 4.239H22.5v-6A2.25 2.25 0 0020.25 3h-7.5zM22.5 12.75h-8.983a4.125 4.125 0 004.108 3.75.75.75 0 010 1.5 5.623 5.623 0 01-4.875-2.817V21h7.5a2.25 2.25 0 002.25-2.25v-6zM11.25 21v-5.817A5.623 5.623 0 016.375 18a.75.75 0 010-1.5 4.126 4.126 0 004.108-3.75H1.5v6A2.25 2.25 0 003.75 21h7.5z" />
                <path d="M11.085 10.354c.03.297.038.575.036.805a7.484 7.484 0 01-.805-.036c-.833-.084-1.677-.325-2.195-.843a1.5 1.5 0 012.122-2.12c.517.517.759 1.36.842 2.194zM12.877 10.354c-.03.297-.038.575-.036.805.23.002.508-.006.805-.036.833-.084 1.677-.325 2.195-.843A1.5 1.5 0 0013.72 8.16c-.518.518-.76 1.362-.843 2.194z" />
              </svg>
              Ingrédients
            </h2>
          </Card.Header>
          <Card.Body className="space-y-2">
            <Ingredients recipe={recipe} />
          </Card.Body>
        </Card>

        <Card variant="flat" className="h-fit">
          <Card.Header>
            <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-primary-600"
              >
                <path
                  fillRule="evenodd"
                  d="M2.625 6.75a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0A.75.75 0 018.25 6h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75zM2.625 12a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zM7.5 12a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12A.75.75 0 017.5 12zm-4.875 5.25a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0zm4.875 0a.75.75 0 01.75-.75h12a.75.75 0 010 1.5h-12a.75.75 0 01-.75-.75z"
                  clipRule="evenodd"
                />
              </svg>
              Instructions
            </h2>
          </Card.Header>
          <Card.Body>
            <ol className="space-y-4 list-none pl-0">
              {recipe.instructions?.map((instruction, index) => (
                <li key={index} className="flex gap-3 group">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-medium group-hover:bg-primary-200 transition-colors">
                    {index + 1}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-neutral-700">{instruction}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Card.Body>
        </Card>

        {recipe.user.username === user.username && (
          <div className="w-full justify-end flex gap-2">
            <LinkButton
              href={`/recipes/${recipe.id}/edit`}
              variant="outline"
              size="sm"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                  <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                </svg>
              }
            >
              Modifier
            </LinkButton>
            <LinkButton
              href={`/recipes/${recipe.id}`}
              method="delete"
              variant="outline"
              size="sm"
              onBefore={() =>
                confirm("Êtes-vous sûr de vouloir supprimer cette recette?")
              }
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
              }
            >
              Supprimer
            </LinkButton>
          </div>
        )}
      </Card>
    </div>
  );
}
