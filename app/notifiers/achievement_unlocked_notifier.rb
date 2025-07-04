# To deliver this notification:
#
# AchievementUnlockedNotifier.with(record: @user_achievement).deliver(achievement_target_user)
class AchievementUnlockedNotifier < ApplicationNotifier
  recipients -> { record.user }

  deliver_by :email do |config|
    config.mailer = "AchievementMailer"
    config.method = :achievement_unlocked
  end

  validates :record, presence: true
end
