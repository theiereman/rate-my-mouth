import { Head, usePage } from "@inertiajs/react";
import { UserType } from "@customTypes/user.types";
import UserProfile from "@components/Users/UserProfile";
import AchievementsList from "@components/Achievements/AchievementsList";
import { useEffect, useState } from "react";
import axios from "axios";
import { AchievementType } from "@customTypes/achievement.types";
import UserPreferences from "@components/Users/UserPreferences";
import { PageProps } from "@customTypes/usepage-props.types";

interface ShowProps {
  user: UserType;
}

interface AchievementsData {
  achievements: AchievementType[];
}

export default function Show({ user }: ShowProps) {
  const { current_user } = usePage<PageProps>().props;

  const isCurrentUser = current_user.username === user.username;

  const [achievementsData, setAchievementsData] =
    useState<AchievementsData | null>(null);
  const [loadingAchievements, setLoadingAchievements] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await axios.get(`/users/${user.id}/achievements`);
        setAchievementsData(response.data);
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
      <Head title={`Profil de ${user.username}`} />

      <div className="mx-auto flex flex-col gap-4">
        <UserProfile user={user} />

        {isCurrentUser && <UserPreferences user={user} />}

        {loadingAchievements ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined animate-spin text-primary-600 text-4xl">
              progress_activity
            </span>
            <p className="mt-2 text-neutral-600">Chargement des succès...</p>
          </div>
        ) : (
          achievementsData && (
            <>
              <AchievementsList achievements={achievementsData.achievements} />
            </>
          )
        )}
      </div>
    </>
  );
}
