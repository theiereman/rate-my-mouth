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

  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const nonSelectedTags = tags.filter(
    (tag) => !selectedTags.find((t) => t.id === tag.id),
  );

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (users.length == 0) initUsers();
    if (tags.length == 0) initTags();
  }, []);

  const debouncedQuery = useDebouncedCallback(() => {
    const params: { name?: string; user_id?: number; tags_ids?: number[] } = {};

    if (searchQuery?.trim()) params.name = searchQuery;
    if (selectedUser) params.user_id = selectedUser.id;
    if (selectedTags && selectedTags.length > 0)
      params.tags_ids = selectedTags.map((tag) => tag.id);

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
            selectedValues={
              selectedUser
                ? [{ value: selectedUser.id, label: selectedUser.username }]
                : undefined
            }
            values={users.map((user) => ({
              value: user.id,
              label: user.username,
            }))}
            onSearchValueChange={useDebouncedCallback(searchUser, 500)}
            onSelectedValue={(value) => {
              setIsLoading(true);
              setSelectedUser(value?.value);
              debouncedQuery();
            }}
            label="Auteur de la recette"
          />

          <Combo
            label="Tags associés"
            selectedValues={selectedTags?.map((tag) => ({
              value: tag.id,
              label: tag.name,
            }))}
            values={nonSelectedTags.map((tag) => ({
              value: tag.id,
              label: `${tag.name} (${tag.recipes_count})`,
            }))}
            onSearchValueChange={useDebouncedCallback(searchTags, 500)}
            onSelectedValue={(value) => {
              setIsLoading(true);
              setSelectedTags([
                ...selectedTags,
                tags.find((tag) => tag.id === value?.value)!,
              ]);
              debouncedQuery();
            }}
            onSelectedValueRemove={(value) => {
              setIsLoading(true);
              setSelectedTags(
                selectedTags.filter((tag) => tag.id !== value.value),
              );
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
