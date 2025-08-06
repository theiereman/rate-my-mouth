class Cooking::Application::Results::Recipes::RecipeWithUser
  attr_reader :recipe, :user

  def initialize(recipe:, user:)
    @recipe = recipe
    @user = user
  end

  def as_json
    {
      id: recipe.id,
      name: recipe.name,
      number_of_servings: recipe.number_of_servings,
      difficulty: recipe.difficulty.to_s,
      tags: recipe.tags.map { |tag| {id: tag.id, name: tag.name} },
      user: {
        id: user.id,
        username: user.username
      }
    }
  end
end
