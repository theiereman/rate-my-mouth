class AchievementUnlockerService
  def initialize(current_user, triggering_record)
    @current_user = current_user
    @triggering_record = triggering_record
  end

  def unlock_corresponding_achievements!(ar_model, event)
    return unless @triggering_record

    AchievementRules.rules.each do |rule|
      if rule.satisfied?(ar_model, event, @triggering_record)
        unlock(rule, @triggering_record)
      end
    end
  end

  private

  def unlock(rule, triggering_record)
    key = rule.key
    target_user = (rule.respond_to?(:target_user) && rule.target_user) ? rule.target_user.call(triggering_record) : @current_user
    return if target_user.user_achievements.exists?(key: key.to_s)
    user_achievement = UserAchievement.create!(user: target_user, key: key.to_s, unlocked_at: Time.current)
    AchievementUnlockedNotifier.with(record: user_achievement).deliver
  end
end
