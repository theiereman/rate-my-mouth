class Recipes::Adapters::CreateRecipeInput
  include ActiveModel::Model

  attr_accessor :name, :description, :url, :number_of_servings, :difficulty,
    :ingredients_attributes, :instructions_attributes, :tags_attributes

  validates :name, presence: true
  validates :number_of_servings, presence: true, numericality: {only_integer: true, greater_than: 0}

  def to_h
    {
      name: name,
      description: description,
      url: url,
      number_of_servings: number_of_servings,
      difficulty: cast_difficulty(:difficulty || "easy"),
      ingredients_attributes: ingredients_attributes || [],
      instructions_attributes: instructions_attributes || [],
      tags_attributes: tags_attributes || []
    }
  end

  private

  def cast_difficulty(difficulty)
    if difficulty.is_a?(String)
      Recipes::ValueObjects::Difficulty.new(difficulty)
    elsif difficulty.is_a?(Integer)
      case difficulty
      when 0 then Recipes::ValueObjects::Difficulty.new("easy")
      when 1 then Recipes::ValueObjects::Difficulty.new("medium")
      when 2 then Recipes::ValueObjects::Difficulty.new("hard")
      else raise ArgumentError, "Unknown difficulty level"
      end
    else
      raise ArgumentError, "Invalid difficulty type"
    end
  rescue ArgumentError => e
    errors.add(:difficulty, e.message)
    nil
  end
end
