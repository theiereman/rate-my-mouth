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
import Page from "@components/ui/Pages/Page";
import Loading from "@components/ui/Loading";

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
    <>
      <Head title={user.username} />
      <Page>
        <UserProfile user={user} />

        {isCurrentUser && <UserPreferences user={user} />}

        <CreatedRecipes userId={user.id} />

        {loadingAchievements ? (
          <Loading text="Chargement des succès..." />
        ) : (
          achievements && (
            <>
              <AchievementsList achievements={achievements} user={user} />
            </>
          )
        )}
      </Page>
    </>
  );
}
