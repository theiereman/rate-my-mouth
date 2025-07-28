import { router } from "@inertiajs/react";
import { RawRecipe, RecipeType } from "@customTypes/recipe.types";
import { Pagination } from "@components/ui";
import { useEffect, useMemo, useState } from "react";
import { PagyMetadata } from "@components/ui/Pagination";
import Page from "@components/ui/Pages/Page";
import { Section } from "@components/ui";
import { useDebouncedCallback } from "use-debounce";
import { UserType } from "@customTypes/user.types";
import { EmptyPlaceholder } from "@components/ui";
import { TagType } from "@customTypes/tag.types";
import RecipeFilters from "@components/Recipe/RecipeFilters";
import { useUrlParams } from "@hooks/useUrlParams";
import { RecipeAdapter } from "@adapters/recipe.adapter";
import RecipeLink from "@components/Recipes/RecipeLink";

export default function Index({
  recipes: rawRecipes,
  pagy,
}: {
  recipes: RawRecipe[];
  pagy: PagyMetadata;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

  const recipes = useMemo(
    () => RecipeAdapter.fromApiArray(rawRecipes),
    [rawRecipes],
  ); //TODO: consider HOC to avoid having to adapt the recipes inside the component

  const { initFromUrl } = useUrlParams({
    onQueryInit: setSearchQuery,
    onUserInit: setSelectedUser,
    onTagsInit: setSelectedTags,
  });

  useEffect(() => {
    initFromUrl();
  }, []);

  const fetchRecipes = (overrides?: {
    searchQuery?: string;
    selectedUser?: UserType | null;
    selectedTags?: TagType[];
  }) => {
    const currentSearchQuery = overrides?.searchQuery ?? searchQuery;
    const currentSelectedUser = overrides?.selectedUser;
    const currentSelectedTags = overrides?.selectedTags ?? selectedTags;

    const params: { name?: string; user_id?: number; tags_ids?: string } = {};

    if (currentSearchQuery?.trim()) params.name = currentSearchQuery;
    if (currentSelectedUser) params.user_id = currentSelectedUser.id;
    if (currentSelectedTags && currentSelectedTags.length > 0)
      params.tags_ids = currentSelectedTags.map((tag) => tag.id).join(",");

    setIsLoadingRecipes(true);
    router.get("/recipes", params, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => setIsLoadingRecipes(false),
    });
  };

  const fetchRecipesDebounced = useDebouncedCallback(() => {
    const params: { name?: string; user_id?: number; tags_ids?: string } = {};

    if (searchQuery?.trim()) params.name = searchQuery;
    if (selectedUser) params.user_id = selectedUser.id;
    if (selectedTags.length > 0)
      params.tags_ids = selectedTags.map((tag) => tag.id).join(",");

    setIsLoadingRecipes(true);
    router.get("/recipes", params, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => setIsLoadingRecipes(false),
    });
  }, 500);

  return (
    <Page
      title="Index des recettes"
      subtitle="Découvrez les dernières recettes et partagez vos recettes favorites !"
    >
      <Section title="Filtres" variant="ghost">
        <RecipeFilters
          searchQuery={searchQuery}
          onSearchQueryChange={(value) => {
            setSearchQuery(value);
            fetchRecipesDebounced();
          }}
          selectedUser={selectedUser}
          onSelectedUserChange={(user) => {
            console.log("Selected user:", user);
            setSelectedUser(user);
            fetchRecipes({ selectedUser: user });
          }}
          selectedTags={selectedTags}
          onSelectedTagsChange={(tags) => {
            setSelectedTags(tags);
            fetchRecipes({ selectedTags: tags });
          }}
        />
      </Section>

      {isLoadingRecipes ? (
        <div className="text-primary-900 mt-8 flex flex-col items-center gap-2">
          <span className="text-lg">Chargement des recettes...</span>
          <span className="material-symbols-outlined animate-spin">
            progress_activity
          </span>
        </div>
      ) : recipes.length === 0 ? (
        <EmptyPlaceholder>Aucune recette disponible</EmptyPlaceholder>
      ) : (
        <div className="grid grid-cols-1 gap-2">
          {recipes.map((recipe: RecipeType) => (
            <RecipeLink key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}

      {pagy && <Pagination className="mt-8" pagy={pagy}></Pagination>}
    </Page>
  );
}
