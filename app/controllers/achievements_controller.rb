class AchievementsController < ApplicationController
  # GET /users/:user_id/achievements
  def index
    @user = Users::Models::User.find(params[:user_id])
    user_achievements = @user.user_achievements.pluck(:key)

    all_achievements = AchievementRules.rules.map do |rule|
      {
        key: rule.key,
        name: rule.name,
        description: rule.description,
        secret: rule.secret,
        unlocked: user_achievements.include?(rule.key.to_s)
      }
    end

    render json: {
      achievements: all_achievements
    }
  end

  def select_achievement_as_title
    @user = current_user

    achievement_key = params[:key]
    user_achievement_keys = @user.user_achievements.pluck(:key)

    unless user_achievement_keys.include?(achievement_key)
      redirect_to user_path(@user), alert: "Vous ne pouvez pas sélectionner ce titre car vous n'avez pas débloqué le succès associé."
      return
    end

    achievement_rule = AchievementRules.rules.find { |rule| rule.key.to_s == achievement_key }

    if achievement_rule
      # storing the value that way could be problematic the day we change the name of the achievements
      # -> should not happen though
      @user.title = achievement_rule.name

      if @user.save
        redirect_to user_path(@user), notice: "Titre mis à jour avec succès"
      else
        redirect_to user_path(@user), alert: "Erreur lors de la mise à jour du titre"
      end
    else
      redirect_to user_path(@user), alert: "Succès introuvable"
    end
  end
end
