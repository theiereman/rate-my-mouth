module AchievementTriggerable
  extend ActiveSupport::Concern

  included do
    after_create -> { AchievementUnlockerService.new(user, self).unlock_corresponding_achievements!(self.class.name, :created) }
    after_update -> { AchievementUnlockerService.new(user, self).unlock_corresponding_achievements!(self.class.name, :updated) }
  end
end
