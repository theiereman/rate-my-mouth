class AchievementUnlocker
  def initialize(user)
    @user = user
  end

  def check!(event_name, metadata = {})
    record = metadata[:record]
    return unless record

    AchievementRules.rules.each do |rule|
      next unless rule.satisfied?(event_name, record)
      unlock(rule.key)
    end
  end

  private

  def unlock(key)
    return if @user.user_achievements.exists?(key: key.to_s)
    UserAchievement.create!(user: @user, key: key.to_s, unlocked_at: Time.current)
  end
end
