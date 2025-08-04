class Recipes::ValueObjects::Ingredient
  attr_reader :name, :category, :recipe_id

  def initialize(name:, recipe_id:, category: "")
    raise ArgumentError, "Name cannot be empty" if name.nil? || name.empty?
    raise ArgumentError, "Recipe ID cannot be empty" if recipe_id.nil? || recipe_id.empty?

    @name = name
    @category = category
    @recipe_id = recipe_id
  end
end
