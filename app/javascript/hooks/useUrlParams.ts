import { useState } from "react";
import axios from "axios";
import { TagType } from "@customTypes/tag.types";
import { UserType } from "@customTypes/user.types";
import { OrderingOption } from "@customTypes/recipe.types";

interface UseUrlParamsProps {
  onQueryInit: (query: string) => void;
  onUserInit: (user: UserType | null) => void;
  onTagsInit: (tags: TagType[]) => void;
  onOrderingOptionInit?: (option: OrderingOption) => void;
}

export const useUrlParams = ({
  onQueryInit,
  onUserInit,
  onTagsInit,
  onOrderingOptionInit,
}: UseUrlParamsProps) => {
  const [isInitializing, setIsInitializing] = useState(false);

  const initFromUrl = async () => {
    setIsInitializing(true);
    const urlParams = new URLSearchParams(window.location.search);

    try {
      const query = urlParams.get("name") || "";
      onQueryInit(query);

      const userId = urlParams.get("user_id");
      if (userId) {
        const response = await axios.get(`/users/by_id?id=${userId}`);
        if (response.data.user) {
          onUserInit(response.data.user);
        }
      }

      const tagsIds = urlParams.get("tags_ids");
      if (tagsIds) {
        const response = await axios.get(`/tags/by_ids?ids=${tagsIds}`);
        onTagsInit(response.data.tags);
      }

      const ordering = urlParams.get("order") as OrderingOption;
      if (ordering && onOrderingOptionInit) {
        onOrderingOptionInit(ordering);
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
