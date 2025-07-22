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
import { TagType } from "@customTypes/tag.types";

export default function Index({
  recipes,
  pagy,
}: {
  recipes: RecipeType[];
  pagy: PagyMetadata;
}) {
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [tags, setTags] = useState<TagType[]>([]);
  const [selectedTags, setSelectedTags] = useState<TagType[]>([]);
  const nonSelectedTags = tags.filter(
    (tag) => !selectedTags.some((t) => t.id === tag.id),
  );

  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [users, setUsers] = useState<UserType[]>([]);

  const urlParams = new URLSearchParams(window.location.search);

  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [isLoadingRecipes, setIsLoadingRecipes] = useState(false);

  useEffect(() => {
    initUsers();
    initTags();
    initQueryFromUrl();
    initSelectedTagsFromUrl();
    initSelectedUserFromUrl();
  }, []);

  //TODO : handle errors and display them under appropriate inputs

  const initQueryFromUrl = () => {
    const query = urlParams.get("name") || "";
    setSearchQuery(query);
  };

  const initSelectedUserFromUrl = async () => {
    const userId = urlParams.get("user_id");
    if (userId) {
      const response = await axios.get(`/users/by_id?id=${userId}`);
      if (response.data.user) {
        setSelectedUser(response.data.user);
      }
    }
  };

  const initSelectedTagsFromUrl = async () => {
    const tagsIds = urlParams.get("tags_ids");
    if (tagsIds) {
      const response = await axios.get(`/tags/by_ids?ids=${tagsIds}`);
      setSelectedTags(response.data.tags);
    }
  };

  const fetchRecipes = useDebouncedCallback(() => {
    const params: { name?: string; user_id?: number; tags_ids?: string } = {};

    if (searchQuery?.trim()) params.name = searchQuery;
    if (selectedUser) params.user_id = selectedUser.id;
    if (selectedTags && selectedTags.length > 0)
      params.tags_ids = selectedTags.map((tag) => tag.id).join(",");

    router.get("/recipes", params, {
      preserveState: true,
      preserveScroll: true,
      onFinish: () => setIsLoadingRecipes(false),
    });
  }, 500);

  const initTags = () => searchTags("");
  const searchTags = async (value: string) => {
    const response = await axios.get(`/tags${value ? `?name=${value}` : ""}`);
    setIsLoadingTags(false);
    setTags(response.data.tags);
  };

  const initUsers = () => searchUser("");
  const searchUser = async (value: string) => {
    const response = await axios.get(
      `/users${value ? `?username=${value}` : ""}`,
    );
    setIsLoadingUsers(false);
    setUsers(response.data.users);
  };

  const debouncedSearchUser = useDebouncedCallback((value: string) => {
    searchUser(value);
  }, 500);

  const debouncedSearchTags = useDebouncedCallback((value: string) => {
    searchTags(value);
  }, 500);

  useEffect(() => {
    setIsLoadingRecipes(true);
    fetchRecipes();
  }, [searchQuery, selectedUser, selectedTags]);

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
              setSearchQuery(e.target.value);
            }}
            value={searchQuery}
          />

          <Combo
            label="Auteur de la recette"
            rightIcon={
              isLoadingUsers ? (
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
              ) : undefined
            }
            values={users.map((user) => ({
              value: user.id,
              label: user.username,
            }))}
            selectedValue={
              selectedUser
                ? { value: selectedUser.id, label: selectedUser.username }
                : undefined
            }
            onSearchValueChange={(value) => {
              setIsLoadingUsers(true);
              debouncedSearchUser(value);
            }}
            onSelectedValue={(value) => {
              setSelectedUser(
                users.find((user) => user.id === value?.value) || null,
              );
            }}
          />

          <Combo
            label="Tags associés"
            rightIcon={
              isLoadingTags ? (
                <span className="material-symbols-outlined animate-spin">
                  progress_activity
                </span>
              ) : undefined
            }
            selectedValue={selectedTags?.map((tag) => ({
              value: tag.id,
              label: tag.name,
            }))}
            values={nonSelectedTags.map((tag) => ({
              value: tag.id,
              label: `${tag.name} (${tag.recipes_count})`,
            }))}
            onSearchValueChange={(value) => {
              setIsLoadingTags(true);
              debouncedSearchTags(value);
            }}
            onSelectedValue={(value) => {
              setSelectedTags((prev) => [
                ...prev,
                tags.find((tag) => tag.id === value?.value)!,
              ]);
            }}
            onSelectedValueRemove={(value) => {
              setSelectedTags((prev) =>
                prev.filter((tag) => tag.id !== value.value),
              );
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
