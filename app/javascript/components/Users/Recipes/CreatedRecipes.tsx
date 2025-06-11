import { RecipeType } from "@customTypes/recipe.types";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeShortItem from "@components/Recipes/RecipeShortItem";
import { useToast } from "@contexts/ToastProvider";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import Section from "@components/ui/Pages/Section";
import { Link } from "@inertiajs/react";

export default function CreatedRecipes({ userId }: { userId: number }) {
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const { showToast } = useToast();

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/recipes`,
          params: {
            user_id: userId,
            limit: 3,
          },
          headers: {
            Accept: "application/json",
          },
        });
        setRecipes(response.data.recipes);
      } catch (error) {
        showToast("Impossible de récupérer les recettes", {
          type: "error",
        });
      } finally {
        setLoadingRecipes(false);
      }
    };

    fetchUserRecipes();
  }, [userId]);

  return (
    <Section
      title="Dernières recettes"
      underlineStroke={2}
      childrenClassName="flex flex-col"
    >
      {loadingRecipes ? (
        <div className="text-center py-8">
          <span className="material-symbols-outlined animate-spin text-primary-600 text-4xl">
            progress_activity
          </span>
          <p className="mt-2 text-neutral-600">Chargement des recettes...</p>
        </div>
      ) : (
        <>
          {recipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-4">
                {recipes.length > 0 &&
                  recipes.map((recipe) => (
                    <RecipeShortItem key={recipe.id} recipe={recipe} />
                  ))}
              </div>
              <Link
                className="mx-auto underline text-primary-500 hover:text-primary-600"
                href={`/recipes?user_id=${userId}`}
              >
                Voir plus de recettes de cet utilisateur
              </Link>
            </>
          ) : (
            <EmptyPlaceholder text="Aucune recette créée pour le moment" />
          )}
        </>
      )}
    </Section>
  );
}
