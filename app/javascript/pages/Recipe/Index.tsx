import { router } from "@inertiajs/react";
import { RecipeType } from "@customTypes/recipe.types";
import RecipeShort from "@components/Recipes/RecipeShortItem";
import { LinkButton, Input, Pagination, Combo } from "@components/ui";
import { useEffect, useState } from "react";
import { PagyMetadata } from "@components/ui/Pagination";
import Page from "@components/ui/Pages/Page";
import Section from "@components/ui/Pages/Section";
import { useDebouncedCallback } from "use-debounce";
import { UserType } from "@customTypes/user.types";
import axios from "axios";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { usePersistantState } from "@hooks/usePersistantState";
import { TagType } from "@customTypes/tag.types";

export default function Index({
  recipes,
  pagy,
}: {
  recipes: RecipeType[];
  pagy: PagyMetadata;
}) {
  const [searchQuery, setSearchQuery] = usePersistantState<string>(
    "",
    "recipe-index-search-query",
  );

  const [tags, setTags] = usePersistantState<TagType[]>(
    [],
    "recipe-index-tags",
  );
  const [selectedTagIds, setSelectedTagIds] = usePersistantState<number[]>(
    [],
    "recipe-index-selected-tags",
  );

  const [selectedUserId, setSelectedUserId] = usePersistantState<number | null>(
    null,
    "recipe-index-selected-user",
  );
  const [users, setUsers] = usePersistantState<UserType[]>(
    [],
    "recipe-index-users",
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (users.length == 0) initUsers();
    if (tags.length == 0) initTags();
  }, []);

  const debouncedQuery = useDebouncedCallback(() => {
    const params: { name?: string; user_id?: number; tags_ids?: number[] } = {};

    if (searchQuery?.trim()) params.name = searchQuery;
    if (selectedUserId) params.user_id = selectedUserId;
    if (selectedTagIds && selectedTagIds.length > 0)
      params.tags_ids = selectedTagIds;

    router.get("/recipes", params, {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    });
  }, 500);

  const initTags = () => searchTags("");
  const searchTags = async (value: string) => {
    const response = await axios.get(`/tags${value ? `?name=${value}` : ""}`);
    setTags(response.data.tags);
  };

  const initUsers = () => searchUser("");
  const searchUser = async (value: string) => {
    const response = await axios.get(
      `/users${value ? `?username=${value}` : ""}`,
    );
    setUsers(response.data.users);
  };

  return (
    <Page
      title="Index des recettes"
      subtitle="Découvrez les dernières recettes et partagez vos recettes favorites !"
      additionnalHeaderContent={
        <LinkButton href="/recipes/new" className="w-full sm:w-auto">
          Nouvelle recette
        </LinkButton>
      }
    >
      <div>
        <Section
          title="Filtres"
          childrenClassName="grid grid-cols-1 mb-6 md:mb-2 md:grid-cols-3 md:gap-4"
        >
          <Input
            label="Nom de la recette"
            onChange={(e) => {
              setIsLoading(true);
              setSearchQuery(e.target.value);
              debouncedQuery();
            }}
            value={searchQuery}
          />

          <Combo
            selectedValues={selectedUserId ? [selectedUserId] : undefined}
            values={users.map((user) => ({
              value: user.id,
              label: user.username,
            }))}
            onSearchValueChange={useDebouncedCallback(searchUser, 500)}
            onSelectedValue={(value) => {
              setIsLoading(true);
              setSelectedUserId(value?.value);
              debouncedQuery();
            }}
            label="Auteur de la recette"
          />

          <Combo
            label="Tags associés"
            selectedValues={selectedTagIds}
            values={tags.map((tag) => ({
              value: tag.id,
              label: `${tag.name} (${tag.recipes_count})`,
            }))}
            onSearchValueChange={useDebouncedCallback(searchTags, 500)}
            onSelectedValue={(value) => {
              setIsLoading(true);
              setSelectedTagIds([value?.value]);
              debouncedQuery();
            }}
          />
        </Section>

        {recipes.length === 0 ? (
          <EmptyPlaceholder
            text="Aucune recette disponible"
            subtext="Soyez le premier à partager une nouvelle recette !"
          />
        ) : (
          <div className="animate-fade-in grid grid-cols-1 gap-6">
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
