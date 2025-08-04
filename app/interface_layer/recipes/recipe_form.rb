class Recipes::RecipeForm
  include ActiveModel::Model

  attr_accessor :name, :description, :ingredients, :instructions, :tags, :user

  validates :name, presence: true
  validates :description, presence: true
  validates :ingredients, presence: true
  validates :instructions, presence: true

  def save
    return false unless valid?

    recipe = Recipe.new(
      name: name,
      description: description,
      user: user
    )

    recipe.ingredients = ingredients.map { |ingredient| Ingredient.new(ingredient) }
    recipe.instructions = instructions.map { |instruction| Instruction.new(instruction) }
    recipe.tags = tags.map { |tag| Tag.find_or_create_by(name: tag) }

    recipe.save
  end
end
