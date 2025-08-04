class Recipes::ValueObjects::Difficulty
  DIFFICULTY_LEVELS = %w[easy medium hard].freeze

  attr_reader :level

  def initialize(level = "easy")
    raise ArgumentError, "Invalid difficulty level" unless DIFFICULTY_LEVELS.include?(level)
    @level = level
  end

  def ==(other)
    other.is_a?(Recipes::ValueObjects::Difficulty) && level == other.level
  end

  def to_s
    level
  end
end
