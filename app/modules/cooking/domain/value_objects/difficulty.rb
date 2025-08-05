class Cooking::Domain::ValueObjects::Difficulty
  LEVELS = %w[easy medium hard].freeze
  LEVEL_VALUES = {"easy" => 1, "medium" => 2, "hard" => 3}.freeze

  attr_reader :level

  def initialize(level)
    normalized_level = normalize_level(level)
    raise ArgumentError, "Invalid difficulty level: #{level}. Must be one of #{LEVELS.join(", ")}" unless valid_level?(normalized_level)

    @level = normalized_level
  end

  def easy?
    @level == "easy"
  end

  def medium?
    @level == "medium"
  end

  def hard?
    @level == "hard"
  end

  def numeric_value
    LEVEL_VALUES[@level]
  end

  def to_s
    @level
  end

  def to_i
    numeric_value
  end

  def ==(other)
    other.is_a?(Difficulty) && @level == other.level
  end

  def >(other)
    return false unless other.is_a?(Difficulty)
    numeric_value > other.numeric_value
  end

  def <(other)
    return false unless other.is_a?(Difficulty)
    numeric_value < other.numeric_value
  end

  def >=(other)
    self > other || self == other
  end

  def <=(other)
    self < other || self == other
  end

  def self.easy
    new("easy")
  end

  def self.medium
    new("medium")
  end

  def self.hard
    new("hard")
  end

  def self.all
    LEVELS.map { |level| new(level) }
  end

  def self.from_numeric(value)
    level = LEVEL_VALUES.key(value.to_i)
    raise ArgumentError, "Invalid numeric difficulty: #{value}" unless level
    new(level)
  end

  private

  def normalize_level(level)
    level.to_s.strip.downcase
  end

  def valid_level?(level)
    LEVELS.include?(level)
  end
end
