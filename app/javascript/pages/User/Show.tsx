import { Head } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";
import UserProfile from "@components/Users/UserProfile";
import AchievementsList from "@components/Achievements/AchievementsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { AchievementType } from "@customTypes/achievement.types";
import UserPreferences from "@components/Users/UserPreferences";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import { Card } from "@components/ui";
import RecipeShortItem from "@components/Recipes/RecipeShortItem";
import { RecipeType } from "@customTypes/recipe.types";

interface ShowProps {
  user: UserType;
}

export default function Show({ user }: ShowProps) {
  const { isCurrentUser } = useUserIsCurrentUser(user);

  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [loadingRecipes, setLoadingRecipes] = useState(true);

  const [achievements, setAchievements] = useState<AchievementType[]>([]);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`/users/${user.id}/achievements`);
        setAchievements(response.data.achievements);
      } catch (error) {
        console.error("Impossible de récupérer les succès:", error);
      } finally {
        setLoadingAchievements(false);
      }
    };

    fetchAchievements();
  }, [user.id]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        const response = await axios({
          method: "GET",
          url: `/recipes`,
          params: {
            user_id: user.id,
            limit: 5,
          },
          headers: {
            Accept: "application/json",
          },
        });
        setRecipes(response.data.recipes);
      } catch (error) {
        console.error("Impossible de récupérer les recettes:", error);
      } finally {
        setLoadingRecipes(false);
      }
    };

    fetchUserRecipes();
  }, [user.id]);

  return (
    <>
      <Head title={`Profil de ${user.username}`} />

      <div className="mx-auto flex flex-col gap-4">
        <UserProfile user={user} />

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
                Recettes
              </h2>
            </Card.Header>
            <Card.Body>
              <div className="grid grid-cols-1 gap-4">
                {recipes.length > 0 &&
                  recipes.map((recipe) => (
                    <RecipeShortItem key={recipe.id} recipe={recipe} />
                  ))}
              </div>
            </Card.Body>
          </Card>
        )}

        {isCurrentUser && <UserPreferences user={user} />}

        {loadingAchievements ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined animate-spin text-primary-600 text-4xl">
              progress_activity
            </span>
            <p className="mt-2 text-neutral-600">Chargement des succès...</p>
          </div>
        ) : (
          achievements && (
            <>
              <AchievementsList achievements={achievements} />
            </>
          )
        )}
      </div>
    </>
  );
}
