import { router } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import RecipeShort from "@components/Recipes/RecipeShortItem";
import UserSelector from "@components/Users/UserSelector";
import { LinkButton, Input, Pagination } from "@components/ui";
import { useEffect, useMemo, useState } from "react";
import { debounce } from "lodash";
import TagsSelector from "@components/Tags/TagsSelector";
import { PagyMetadata } from "@components/ui/Pagination";
import Page from "@components/ui/Pages/Page";
import Section from "@components/ui/Pages/Section";

interface IndexProps {
  recipes: RecipeType[];
  pagy: PagyMetadata;
}

export default function Index({ recipes, pagy }: IndexProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Récupérer les paramètres de l'URL
    const params = new URLSearchParams(window.location.search);

    const query = params.get("name") || "";
    const userId = params.get("user_id");
    const tags = params.getAll("tags_ids[]");

    // Initialiser les états avec les valeurs des paramètres
    setSearchQuery(query);
    setSelectedUserId(userId ? parseInt(userId, 10) : null);
    setSelectedTagIds(tags.map((tag) => parseInt(tag)));
  }, []);

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

    router.get("/recipes", params, {
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
    setSelectedTagIds(tagIds);
    search(searchQuery, selectedUserId, tagIds);
  };

  return (
    <Page
      title="Recettes"
      subtitle="Découvrez les dernières recettes et partagez vos recettes favorites !"
      additionnalHeaderContent={
        <LinkButton
          href="/recipes/new"
          variant="primary"
          className="w-full sm:w-auto"
        >
          Nouvelle recette
        </LinkButton>
      }
    >
      <div>
        <Section
          title="Filtres"
          childrenClassName="grid grid-cols-1 mb-4 md:grid-cols-3 md:gap-4"
        >
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

          <UserSelector
            initialUserId={selectedUserId ?? undefined}
            onUserSelected={handleUserSelected}
          />
          <TagsSelector
            maxTags={Infinity}
            label=""
            createNewTags={false}
            initialTags={selectedTagIds.map((id) => ({ id, name: "" }))}
            onTagsSelected={handleTagsSelected}
          />
        </Section>

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
        {pagy && <Pagination className="mt-8" pagy={pagy}></Pagination>}
      </div>
    </Page>
  );
}
