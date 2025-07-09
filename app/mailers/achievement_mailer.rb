class AchievementMailer < ApplicationMailer
  def achievement_unlocked
    @user_achievement = params[:record]
    @user = @user_achievement.user
    @achievement_rule = AchievementRules.rules.find { |rule| rule.key.to_s == @user_achievement.key }

    mail(
      to: @user.email,
      subject: "Vous avez débloqué un nouveau succès"
    )
  end
end
