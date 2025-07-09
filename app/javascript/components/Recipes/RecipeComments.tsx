import CommentList from "@components/Comments/CommentList";
import { CommentType } from "@customTypes/comment.types";
import { useEffect, useState } from "react";
import axios from "axios";
import { CustomPagination, Toast } from "@components/ui";
import Loading from "@components/ui/Loading";
import { useToast } from "@contexts/ToastProvider";

export default function RecipeComments({ recipeId }: { recipeId: number }) {
  const [firstLoading, setFirstLoading] = useState(true);
  const [comments, setComments] = useState<CommentType[]>([]);
  const [pagy, setPagy] = useState<any>(null);

  const { showToast } = useToast();

  const fetchComments = async (page: number = 1) => {
    try {
      const response = await axios.get(
        `/recipes/${recipeId}/comments?limit=5&page=${page}`
      );
      setComments(response.data.comments);
      setPagy(response.data.pagy);
    } catch (error) {
      showToast("Impossible de récupérer les commentaires.", { type: "error" });
    } finally {
      setFirstLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div>
      {firstLoading ? (
        <Loading text="Chargement des commentaires..." />
      ) : (
        <>
          <CommentList comments={comments} />
          {comments.length > 0 && (
            <CustomPagination
              pagy={pagy}
              onFirstClick={fetchComments}
              onPrevClick={() => fetchComments(pagy?.prev)}
              onNextClick={() => fetchComments(pagy?.next)}
              onLastClick={() => fetchComments(pagy?.last)}
            />
          )}
        </>
      )}
    </div>
  );
}
