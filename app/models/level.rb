class Level < ApplicationRecord
  BASE_XP_PER_LEVEL = 12
  EXPONENT = 1.5

  belongs_to :user

  def self.xp_for(level)
    (1..level).sum { |l| (BASE_XP_PER_LEVEL * l**EXPONENT).to_i }
  end

  def current
    level = 1
    loop do
      if xp < self.class.xp_for(level)
        return level - 1
      end
      level += 1
    end
  end

  def remaining_xp_for_next_level
    xp_for_next_level = self.class.xp_for(current + 1)
    xp_for_next_level - xp
  end

  def current_level_progress
    current_level_xp = xp - self.class.xp_for(current)
    next_level_xp = self.class.xp_for(current + 1) - self.class.xp_for(current)
    return 0 if next_level_xp.zero?
    (current_level_xp.to_f / next_level_xp * 100).round(2)
  end
end
