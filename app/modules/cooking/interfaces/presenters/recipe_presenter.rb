class Cooking::Interfaces::Presenters::RecipePresenter
  def initialize(recipe)
    @recipe = recipe
  end

  def as_json
    {
      id: @recipe.id,
      name: @recipe.name,
      number_of_servings: @recipe.number_of_servings,
      difficulty: @recipe.difficulty.to_s,
      user_id: @recipe.user_id,
      tags: @recipe.tags.map { |tag| {id: tag.id, name: tag.name} },
      average_rating: 0,
      ratings_count: 0
    }
  end
end
