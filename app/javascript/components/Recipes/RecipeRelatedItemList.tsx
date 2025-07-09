import { useToast } from "@contexts/ToastProvider";
import { RatingType } from "@customTypes/rating.types";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@components/ui/Loading";
import RatingList from "@components/Ratings/RatingList";
import { CustomPagination } from "@components/ui";
import CommentList from "@components/Comments/CommentList";
import { CommentType } from "@customTypes/comment.types";

export default function RecipeRelatedItemList({
  recipeId,
  relatedItemType,
}: {
  recipeId: number;
  relatedItemType: "ratings" | "comments";
}) {
  const [firstLoading, setFirstLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [pagy, setPagy] = useState<any>(null);

  const { showToast } = useToast();

  const fetchRatings = async (page: number) => {
    try {
      const response = await axios.get(
        `/recipes/${recipeId}/${relatedItemType}?page=${page}`
      );
      setItems(
        relatedItemType === "ratings"
          ? response.data.ratings
          : response.data.comments
      );
      setPagy(response.data.pagy);
    } catch (error) {
      showToast(
        `Impossible de récupérer les ${
          relatedItemType == "comments" ? "commentaires" : "évaluations"
        }.`,
        {
          type: "error",
        }
      );
    } finally {
      setFirstLoading(false);
    }
  };

  useEffect(() => {
    fetchRatings(1);
  }, []);

  return (
    <div>
      {firstLoading ? (
        <Loading text="Chargement des évaluations..." />
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
              onFirstClick={() => fetchRatings(1)}
              onPrevClick={() => fetchRatings(pagy?.prev)}
              onNextClick={() => fetchRatings(pagy?.next)}
              onLastClick={() => fetchRatings(pagy?.last)}
            />
          )}
        </>
      )}
    </div>
  );
}
