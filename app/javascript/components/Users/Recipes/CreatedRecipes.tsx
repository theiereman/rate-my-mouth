import { RecipeType } from "@customTypes/recipe.types";
import { useEffect, useState } from "react";
import axios from "axios";
import RecipeShortItem from "@components/Recipes/RecipeShortItem";
import { useToast } from "@contexts/ToastProvider";
import EmptyPlaceholder from "@components/ui/EmptyPlaceholder";
import { Card, LinkButton } from "@components/ui";

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
            limit: 5,
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
    <>
      {loadingRecipes ? (
        <div className="text-center py-8">
          <span className="material-symbols-outlined animate-spin text-primary-600 text-4xl">
            progress_activity
          </span>
          <p className="mt-2 text-neutral-600">Chargement des recettes...</p>
        </div>
      ) : (
        <Card>
          <Card.Header>
            <h2 className="text-xl font-semibold text-neutral-800 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-600">
                article
              </span>
              Dernières recettes
            </h2>
          </Card.Header>
          <Card.Body className="flex flex-col gap-8">
            {recipes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {recipes.length > 0 &&
                    recipes.map((recipe) => (
                      <RecipeShortItem key={recipe.id} recipe={recipe} />
                    ))}
                </div>
                <LinkButton
                  className="mx-auto"
                  href={`/recipes?user_id=${userId}`}
                >
                  Voir plus de recettes de cet utilisateur
                </LinkButton>
              </>
            ) : (
              <EmptyPlaceholder text="Aucune recette créée pour le moment" />
            )}
          </Card.Body>
        </Card>
      )}
    </>
  );
}
