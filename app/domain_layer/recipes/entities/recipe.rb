class Recipes::Entities::Recipe
  attr_reader :id, :name, :description, :ingredients, :instructions, :number_of_servings, :difficulty, :user_id, :url

  def initialize(attributes = {})
    @id = attributes[:id]
    @name = attributes[:name]
    @description = attributes[:description] || ""
    @ingredients = attributes[:ingredients] || []
    @instructions = attributes[:instructions] || []
    @number_of_servings = attributes[:number_of_servings] || 4
    @difficulty = Recipes::ValueObjects::Difficulty.new(attributes[:difficulty] || "easy")
    @user_id = attributes[:user_id]
    @url = attributes[:url] || ""
    validate!
  end

  def validate!
    raise ArgumentError, "Name can't be blank" if name.nil? || name.strip.empty?
    raise ArgumentError, "Number of servings must be a positive integer" unless number_of_servings.is_a?(Integer) && number_of_servings > 0
    # raise ArgumentError, "Invalid difficulty level" unless Recipes::ValueObjects::Difficulty::DIFFICULTY_LEVELS.include?(difficulty.level)
  end
end
