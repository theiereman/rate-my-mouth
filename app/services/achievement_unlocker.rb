class AchievementUnlocker
  def initialize(user)
    @user = user
  end

  # event_name comme "post.created", et metadata[:record] l'instance
  def check!(event_name, metadata = {})
    record = metadata[:record]
    AchievementRules.rules.each do |rule|
      p rule
      next unless rule.satisfied?(event_name, record)
      unlock(rule.key)
    end
  end

  private

  def unlock(key)
    p "key = #{key}"
    p @user.user_achievements.exists?(key: key)
    return if @user.user_achievements.exists?(key: key)
    UserAchievement.create!(user: @user, key: key, unlocked_at: Time.current)
  end
end
