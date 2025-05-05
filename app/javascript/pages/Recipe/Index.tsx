import { Head, router } from "@inertiajs/react";
import { RecipeType } from "./types";
import RecipeShort from "./components/RecipeShort";
import UserSelector from "../../components/users/UserSelector";
import { LinkButton, Input } from "../../components/ui";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import LoadingSpinner from "../../components/shared/LoadingSpinner";

interface IndexProps {
  recipes: RecipeType[];
}

export default function Index({ recipes }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const search = (query?: string, user_id?: number | null) => {
    setIsLoading(true);

    const params: { query?: string; user_id?: number } = {};

    if (query?.trim()) params.query = query;
    if (user_id) params.user_id = user_id;

    router.get("/recipes/search", params, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    });
  };

  const debouncedSearch = useMemo(() => debounce(search, 500), []);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearch = (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    debouncedSearch(query, selectedUserId);
  };

  const handleUserSelected = (userId: number | null) => {
    setSelectedUserId(userId);
    search(searchQuery, userId);
  };

  return (
    <>
      <Head title="Recettes" />

      <div className="mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">
              Recettes
            </h1>
            <p className="text-neutral-600">
              Découvrez et partagez des recettes délicieuses
            </p>
          </div>

          <LinkButton
            href="/recipes/new"
            variant="primary"
            size="lg"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5"
              >
                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
              </svg>
            }
          >
            Nouvelle recette
          </LinkButton>
        </div>

        <div
          id="filters"
          className="border rounded-lg p-4 my-6 border-neutral-200"
        >
          <h1 className="text-xl font-semibold text-neutral-800 mb-2">
            Filtres
            <p className="text-sm font-normal text-neutral-500 ">
              Additionnez les filtres entre eux pour affiner la recherche
            </p>
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Rechercher une recette..."
              onChange={(e) => handleSearch(e.target.value)}
              value={searchQuery}
              rightIcon={isLoading ? <LoadingSpinner /> : undefined}
            />

            <UserSelector onUserSelected={handleUserSelected} />
          </div>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12 mx-auto text-neutral-400 mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
              />
            </svg>
            <h3 className="text-lg font-medium text-neutral-800 mb-2">
              Aucune recette disponible
            </h3>
            <p className="text-neutral-600 mb-4">
              Soyez le premier à partager une recette délicieuse !
            </p>
            <LinkButton href="/recipes/new" variant="primary">
              Ajouter une recette
            </LinkButton>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 animate-fade-in">
            {recipes.map((recipe) => (
              <RecipeShort key={recipe.id} recipe={recipe} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
