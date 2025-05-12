class AchievementsController < ApplicationController
  # GET /users/:user_id/achievements
  def index
    @user = User.find(params[:user_id])
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
end
