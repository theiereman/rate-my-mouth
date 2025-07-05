class AchievementUnlockerService
  def initialize(user)
    @user = user
  end

  def check!(event_name, metadata = {})
    record = metadata[:record]
    return unless record

    AchievementRules.rules.each do |rule|
      next unless rule.satisfied?(event_name, record)
      unlock(rule, record)
    end
  end

  private

  def unlock(rule, record)
    key = rule.key
    target_user = rule.respond_to?(:target_user) && rule.target_user ? rule.target_user.call(record) : @user
    return if target_user.user_achievements.exists?(key: key.to_s)
    user_achievement = UserAchievement.create!(user: target_user, key: key.to_s, unlocked_at: Time.current)
    AchievementUnlockedNotifier.with(record: user_achievement).deliver
  end
end
