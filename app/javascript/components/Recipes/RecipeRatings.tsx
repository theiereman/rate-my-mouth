import { useToast } from "@contexts/ToastProvider";
import { RatingType } from "@customTypes/rating.types";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@components/ui/Loading";
import RatingList from "@components/Ratings/RatingList";
import { CustomPagination } from "@components/ui";

export default function RecipeRatings({ recipeId }: { recipeId: number }) {
  const [firstLoading, setFirstLoading] = useState(true);
  const [ratings, setRatings] = useState<RatingType[]>([]);
  const [pagy, setPagy] = useState<any>(null);

  const { showToast } = useToast();

  const fetchRatings = async (page: number) => {
    try {
      const response = await axios.get(
        `/recipes/${recipeId}/ratings?limit=5&page=${page}`
      );
      setRatings(response.data.ratings);
      setPagy(response.data.pagy);
    } catch (error) {
      showToast("Impossible de récupérer les évaluations.", { type: "error" });
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
          <RatingList ratings={ratings} />
          {ratings.length > 0 && (
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
