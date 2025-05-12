import { Head, router } from "@inertiajs/react";
import { RecipeType } from "./types";
import RecipeShort from "./components/RecipeShort";
import UserSelector from "../User/components/UserSelector";
import { LinkButton, Input } from "../../components";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import TagsSelector from "../Tag/components/TagsSelector";

interface IndexProps {
  recipes: RecipeType[];
}

export default function Index({ recipes }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const search = (
    name?: string,
    user_id?: number | null,
    tags_ids?: number[]
  ) => {
    setIsLoading(true);

    const params: { name?: string; user_id?: number; tags_ids?: number[] } = {};

    if (name?.trim()) params.name = name;
    if (user_id) params.user_id = user_id;
    if (tags_ids && tags_ids.length > 0) params.tags_ids = tags_ids;

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
    debouncedSearch(query, selectedUserId, selectedTagIds);
  };

  const handleUserSelected = (userId: number | null) => {
    setSelectedUserId(userId);
    search(searchQuery, userId, selectedTagIds);
  };

  const handleTagsSelected = (tags: { id?: number; name: string }[]) => {
    const tagIds = tags.map((tag) => tag.id).filter(Boolean) as number[];
    console.log(tagIds);
    setSelectedTagIds(tagIds);
    search(searchQuery, selectedUserId, tagIds);
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
            className=""
            icon={
              <span className="material-symbols-outlined current-color">
                add
              </span>
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
              rightIcon={
                isLoading ? (
                  <span className="material-symbols-outlined text-primary-600 animate-spin">
                    progress_activity
                  </span>
                ) : undefined
              }
            />

            <UserSelector onUserSelected={handleUserSelected} />
            <TagsSelector
              maxTags={Infinity}
              label=""
              createNewTags={false}
              onTagsSelected={handleTagsSelected}
            />
          </div>
        </div>

        {recipes.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-lg border border-neutral-200">
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
