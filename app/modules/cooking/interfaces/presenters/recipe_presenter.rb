class Cooking::Interfaces::Presenters::RecipePresenter
  def initialize(recipe, average_rating_service, total_ratings_service)
    @recipe = recipe
    @average_rating_service = average_rating_service
    @total_ratings_service = total_ratings_service
  end

  def as_json
    {
      id: @recipe.id,
      name: @recipe.name,
      number_of_servings: @recipe.number_of_servings,
      difficulty: @recipe.difficulty.to_s,
      user_id: @recipe.user_id,
      tags: @recipe.tags.map { |tag| {id: tag.id, name: tag.name} },
      average_rating: @average_rating_service.call,
      ratings_count: @total_ratings_service.call
    }
  end
end
