class Cooking::Domain::Entities::Recipe
  attr_reader :id, :name, :number_of_servings, :tags, :ingredients, :instructions, :difficulty, :user_id, :thumbnail

  def initialize(name:, number_of_servings: 4, difficulty: "easy", user_id: nil, tags: [], ingredients: [], instructions: [])
    @name = validate_name(name)
    @number_of_servings = validate_servings(number_of_servings)
    @difficulty = difficulty.is_a?(Cooking::Domain::ValueObjects::Difficulty) ? difficulty : Cooking::Domain::ValueObjects::Difficulty.new(difficulty)
    @user_id = user_id
    @tags = tags || []
    @ingredients = ingredients || []
    @instructions = instructions || []
  end

  def rename(name)
    @name = validate_name(name)
  end

  def add_ingredient(ingredient)
    @ingredients ||= []
    @ingredients << ingredient
  end

  def add_instruction(instruction)
    @instructions ||= []
    @instructions << instruction
  end

  def attach_thumbnail(thumbnail)
    @thumbnail = thumbnail
  end

  def set_number_of_servings(number)
    @number_of_servings = validate_servings(number)
  end

  def set_easy
    @difficulty = Cooking::Domain::ValueObjects::Difficulty.easy
  end

  def set_medium
    @difficulty = Cooking::Domain::ValueObjects::Difficulty.medium
  end

  def set_hard
    @difficulty = Cooking::Domain::ValueObjects::Difficulty.hard
  end

  def easy?
    @difficulty.easy?
  end

  def medium?
    @difficulty.medium?
  end

  def hard?
    @difficulty.hard?
  end

  private

  attr_writer :id, :ingredients, :instructions, :difficulty, :thumbnail

  def validate_name(name)
    raise ArgumentError, "Recipe name cannot be blank" if name.blank?
    name.strip
  end

  def validate_servings(servings)
    raise ArgumentError, "Number of servings must be positive" if servings.to_i <= 0
    servings.to_i
  end
end
