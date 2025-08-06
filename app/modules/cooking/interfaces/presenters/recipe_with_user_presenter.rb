class Cooking::Interfaces::Presenters::RecipeWithUserPresenter
  def initialize(recipe_with_user, average_rating_service, total_ratings_service)
    @recipe_with_user = recipe_with_user
    @average_rating_service = average_rating_service
    @total_ratings_service = total_ratings_service
  end

  def as_json
    {
      id: @recipe_with_user.recipe.id,
      name: @recipe_with_user.recipe.name,
      number_of_servings: @recipe_with_user.recipe.number_of_servings,
      difficulty: @recipe_with_user.recipe.difficulty.to_s,
      user: user_data,
      tags: @recipe_with_user.recipe.tags.map { |tag| {id: tag.id, name: tag.name} },
      average_rating: @average_rating_service.call,
      ratings_count: @total_ratings_service.call
    }
  end

  private

  def user_data
    return nil unless @recipe_with_user.user

    {
      id: @recipe_with_user.user.id,
      username: @recipe_with_user.user.username
    }
  end
end
