import { router } from "@inertiajs/react";
import { RawRecipe, RecipeType } from "@customTypes/recipe.types";
import { LinkButton, Pagination } from "@components/ui";
import { useEffect, useMemo, useState } from "react";
import { PagyMetadata } from "@components/ui/Pagination";
import Page from "@components/ui/Pages/Page";
import { Section } from "@components/ui";
import { useDebouncedCallback } from "use-debounce";
import { UserType } from "@customTypes/user.types";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { TagType } from "@customTypes/tag.types";
import RecipeFilters from "@components/Recipe/RecipeFilters";
import { useRecipeFilters } from "@hooks/useRecipeFilters";
import { useUrlParams } from "@hooks/useUrlParams";
import { RecipeAdapter } from "@adapters/recipe.adapter";
import RecipeShortItem from "@components/Recipes/RecipeLink";
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

  const {
    tags,
    users,
    isLoadingTags,
    isLoadingUsers,
    errors,
    searchTags,
    searchUsers,
    initTags,
    initUsers,
  } = useRecipeFilters();

  const { initFromUrl } = useUrlParams({
    onQueryInit: setSearchQuery,
    onUserInit: setSelectedUser,
    onTagsInit: setSelectedTags,
  });

  useEffect(() => {
    initUsers();
    initTags();
    initFromUrl();
  }, []);

  const fetchRecipes = useDebouncedCallback(() => {
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

  useEffect(() => {
    fetchRecipes();
  }, [searchQuery, selectedUser, selectedTags]);

  return (
    <Page
      title="Index des recettes"
      subtitle="Découvrez les dernières recettes et partagez vos recettes favorites !"
    >
      <Section title="Filtres" variant="ghost">
        <RecipeFilters
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          selectedUser={selectedUser}
          onSelectedUserChange={setSelectedUser}
          selectedTags={selectedTags}
          onSelectedTagsChange={setSelectedTags}
          users={users}
          tags={tags}
          isLoadingUsers={isLoadingUsers}
          isLoadingTags={isLoadingTags}
          onSearchUsers={searchUsers}
          onSearchTags={searchTags}
          errors={errors}
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
        <EmptyPlaceholder
          text="Aucune recette disponible"
          subtext="Soyez le premier à partager une nouvelle recette !"
        />
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
