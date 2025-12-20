class Level < ApplicationRecord
  BASE_XP_PER_LEVEL = 12
  EXPONENT = 1.5

  belongs_to :user

  def self.xp_for(level)
    (BASE_XP_PER_LEVEL * level**EXPONENT).to_i
  end

  def current
    level = 1
    xp_left = xp

    xp_required_for_next_level = (BASE_XP_PER_LEVEL * level**EXPONENT).to_i

    while xp_left >= xp_required_for_next_level
      xp_left -= xp_required_for_next_level
      level += 1
      xp_required_for_next_level = (BASE_XP_PER_LEVEL * level**EXPONENT).to_i
    end

    level
  end

  def remaining_xp_for_next_level
    xp_for_next_level = self.class.xp_for(current + 1)
    xp_for_next_level - xp
  end
end
