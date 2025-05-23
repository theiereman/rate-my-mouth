import { Head } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";
import UserProfile from "@components/Users/UserProfile";
import AchievementsList from "@components/Achievements/AchievementsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { AchievementType } from "@customTypes/achievement.types";
import UserPreferences from "@components/Users/UserPreferences";
import { useUserIsCurrentUser } from "@hooks/useUserIsCurrentUser";
import CreatedRecipes from "@components/Users/Recipes/CreatedRecipes";

export default function Show({ user }: { user: UserType }) {
  const { isCurrentUser } = useUserIsCurrentUser(user);

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

  return (
    <div className="space-y-4">
      <Head title={`Profil de ${user.username}`} />

      <UserProfile user={user} />

      {isCurrentUser && <UserPreferences user={user} />}

      <CreatedRecipes userId={user.id} />

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
            <AchievementsList achievements={achievements} user={user} />
          </>
        )
      )}
    </div>
  );
}
