import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import axios from "axios";
import { TagType } from "@customTypes/tag.types";
import { UserType } from "@customTypes/user.types";

export const useRecipeFilters = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const [users, setUsers] = useState<UserType[]>([]);
  const [isLoadingTags, setIsLoadingTags] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [errors, setErrors] = useState<{ tags?: string; users?: string }>({});

  const searchTags = async (value: string) => {
    try {
      setIsLoadingTags(true);
      setErrors((prev) => ({ ...prev, tags: undefined }));
      const response = await axios.get(`/tags${value ? `?name=${value}` : ""}`);
      setTags(response.data.tags);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        tags: "Erreur lors du chargement des tags",
      }));
    } finally {
      setIsLoadingTags(false);
    }
  };

  const searchUsers = async (value: string) => {
    try {
      setIsLoadingUsers(true);
      setErrors((prev) => ({ ...prev, users: undefined }));
      const response = await axios.get(
        `/users${value ? `?username=${value}` : ""}`,
      );
      setUsers(response.data.users);
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        users: "Erreur lors du chargement des utilisateurs",
      }));
    } finally {
      setIsLoadingUsers(false);
    }
  };

  const debouncedSearchUsers = useDebouncedCallback(searchUsers, 500);
  const debouncedSearchTags = useDebouncedCallback(searchTags, 500);

  return {
    tags,
    users,
    isLoadingTags,
    isLoadingUsers,
    errors,
    searchTags: debouncedSearchTags,
    searchUsers: debouncedSearchUsers,
    initTags: () => searchTags(""),
    initUsers: () => searchUsers(""),
  };
};
