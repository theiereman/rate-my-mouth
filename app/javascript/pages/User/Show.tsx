import { Head } from "@inertiajs/react";
import { UserType, AchievementType } from "./types";
import UserProfile from "./components/UserProfile";
import AchievementsList from "./components/AchievementsList";
import { LinkButton } from "../../components/ui";
import { useEffect, useState } from "react";
import axios from "axios";

interface ShowProps {
  user: UserType;
  flash: { notice?: string };
}

interface AchievementsData {
  achievements: AchievementType[];
}

export default function Show({ user, flash }: ShowProps) {
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

      {flash.notice && (
        <div className="mb-4 bg-green-50 p-4 rounded-lg text-green-700">
          {flash.notice}
        </div>
      )}

      <div className="mx-auto flex flex-col gap-8">
        <UserProfile user={user} />

        {loadingAchievements ? (
          <div className="text-center py-8">
            <span className="material-symbols-outlined animate-spin text-primary-600 text-4xl">
              progress_activity
            </span>
            <p className="mt-2 text-neutral-600">Chargement des données...</p>
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
