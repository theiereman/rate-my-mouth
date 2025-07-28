import { useToast } from "@contexts/ToastContext";
import { RatingType } from "@customTypes/rating.types";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@components/ui/Loading";
import RatingList from "@components/Ratings/RatingList";
import { CustomPagination } from "@components/ui";
import CommentList from "@components/Comments/CommentList";
import { CommentType } from "@customTypes/comment.types";
import { RecipeType } from "@customTypes/recipe.types";

export default function RecipeRelatedItemList({
  recipe,
  relatedItemType,
  preloadedItems = [],
}: {
  recipe: RecipeType;
  relatedItemType: "ratings" | "comments";
  preloadedItems?: RatingType[] | CommentType[];
}) {
  const [firstLoading, setFirstLoading] = useState(true);
  const [items, setItems] = useState<RatingType[] | CommentType[]>([]);
  const [pagy, setPagy] = useState<any>(null);

  const { showToast } = useToast();

  const fetchItems = async (page: number) => {
    try {
      const response = await axios.get(
        `/recipes/${recipe.id}/${relatedItemType}?page=${page}`,
      );
      setItems(
        relatedItemType === "ratings"
          ? response.data.ratings
          : response.data.comments,
      );
      setPagy(response.data.pagy);
    } catch (error) {
      showToast(
        `Impossible de récupérer les ${
          relatedItemType == "comments" ? "commentaires" : "évaluations"
        }.`,
        {
          type: "error",
        },
      );
    } finally {
      setFirstLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(pagy?.page || 1);
  }, [recipe]);

  useEffect(() => {
    if (preloadedItems.length > 0) {
      appendItems(preloadedItems);
      setFirstLoading(false);
    }
  }, [preloadedItems]);

  // Helper to append new items while preserving type safety
  const appendItems = (newItems: RatingType[] | CommentType[]) => {
    setItems((prev) => {
      if (relatedItemType === "ratings") {
        const prevById = new Map(
          (prev as RatingType[]).map((item) => [item.id, item]),
        );
        (newItems as RatingType[]).forEach((item) => {
          if (!prevById.has(item.id)) {
            prevById.set(item.id, item);
          }
        });
        // Preserve original order of prev, append only new items
        return (prev as RatingType[]).concat(
          (newItems as RatingType[]).filter(
            (item) => !prev.some((p) => p.id === item.id),
          ),
        );
      } else {
        const prevById = new Map(
          (prev as CommentType[]).map((item) => [item.id, item]),
        );
        (newItems as CommentType[]).forEach((item) => {
          if (!prevById.has(item.id)) {
            prevById.set(item.id, item);
          }
        });
        // Preserve original order of prev, append only new items
        return (prev as CommentType[]).concat(
          (newItems as CommentType[]).filter(
            (item) => !prev.some((p) => p.id === item.id),
          ),
        );
      }
    });
  };

  return (
    <div>
      {firstLoading ? (
        <Loading text="Chargement..." />
      ) : (
        <>
          {relatedItemType === "ratings" ? (
            <RatingList ratings={items as RatingType[]} />
          ) : (
            <CommentList comments={items as CommentType[]} />
          )}
          {items.length > 0 && (
            <CustomPagination
              pagy={pagy}
              onFirstClick={() => fetchItems(1)}
              onPrevClick={() => fetchItems(pagy?.prev)}
              onNextClick={() => fetchItems(pagy?.next)}
              onLastClick={() => fetchItems(pagy?.last)}
            />
          )}
        </>
      )}
    </div>
  );
}
