class SourceExplorerController < ApplicationController
  def unlock_secret
    if params[:secret_key] == "curious_minds_find_hidden_treasures"
      unless current_user.user_achievements.exists?(key: "code_explorer")
        UserAchievement.create!(
          user: current_user,
          key: "code_explorer",
          unlocked_at: Time.current
        )

        flash[:success] = "Félicitations ! Tu as débloqué le succès 'Explorateur de Code' !"
      else
        flash[:info] = "Tu as déjà débloqué ce succès."
      end
    else
      flash[:alert] = "Clé secrète invalide. Regarde plus attentivement dans le code source!"
    end

    redirect_to my_profile_path
  end
end
