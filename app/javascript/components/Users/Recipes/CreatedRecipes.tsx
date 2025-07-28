import { RecipeType } from "@customTypes/recipe.types";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeShortItem from "@components/Recipes/RecipeLink";
import { useToast } from "@contexts/ToastContext";
import { EmptyPlaceholder } from "@components/ui";
import { LinkButton, Section } from "@components/ui";
import Loading from "@components/ui/Loading";
import { RecipeAdapter } from "@adapters/recipe.adapter";

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

        setRecipes(RecipeAdapter.fromApiArray(response.data.recipes));
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
    <Section title="Dernières recettes" variant="ghost">
      {loadingRecipes ? (
        <Loading text="Chargement des recettes..." />
      ) : (
        <>
          {recipes.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-2">
                {recipes.length > 0 &&
                  recipes.map((recipe) => (
                    <RecipeShortItem key={recipe.id} recipe={recipe} />
                  ))}
                <LinkButton
                  className="w-full"
                  href={`/recipes?user_id=${userId}`}
                >
                  Voir plus de recettes de cet utilisateur
                </LinkButton>
              </div>
            </>
          ) : (
            <EmptyPlaceholder>
              Aucune recette créée pour le moment
            </EmptyPlaceholder>
          )}
        </>
      )}
    </Section>
  );
}
