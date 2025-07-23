import { useState } from "react";
import axios from "axios";
import { TagType } from "@customTypes/tag.types";
import { UserType } from "@customTypes/user.types";

interface UseUrlParamsProps {
  onQueryInit: (query: string) => void;
  onUserInit: (user: UserType | null) => void;
  onTagsInit: (tags: TagType[]) => void;
}

export const useUrlParams = ({
  onQueryInit,
  onUserInit,
  onTagsInit,
}: UseUrlParamsProps) => {
  const [isInitializing, setIsInitializing] = useState(false);

  const initFromUrl = async () => {
    setIsInitializing(true);
    const urlParams = new URLSearchParams(window.location.search);

    try {
      // Initialize query
      const query = urlParams.get("name") || "";
      onQueryInit(query);

      // Initialize selected user
      const userId = urlParams.get("user_id");
      if (userId) {
        const response = await axios.get(`/users/by_id?id=${userId}`);
        if (response.data.user) {
          onUserInit(response.data.user);
        }
      }

      // Initialize selected tags
      const tagsIds = urlParams.get("tags_ids");
      if (tagsIds) {
        const response = await axios.get(`/tags/by_ids?ids=${tagsIds}`);
        onTagsInit(response.data.tags);
      }
    } catch (error) {
      console.error("Erreur lors de l'initialisation depuis l'URL:", error);
    } finally {
      setIsInitializing(false);
    }
  };

  return {
    initFromUrl,
    isInitializing,
  };
};
