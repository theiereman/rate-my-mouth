class Cooking::Application::UseCases::Recipes::GetPaginatedRecipesWithUsersQuery < Shared::Application::UseCases::UseCaseBase
  def initialize(recipe_repository, user_repository, pagination_params: {}, filters: {})
    @recipe_repository = recipe_repository
    @user_repository = user_repository
    @pagination_params = pagination_params
    @filters = filters
  end

  def call
    paginated_result = recipe_repository.all(pagination_params, filters)

    user_ids = paginated_result.data.map(&:user_id).uniq.compact

    users = user_repository.find_by_ids(user_ids)
    users_by_id = users.index_by(&:id)

    enriched_recipes = paginated_result.data.map do |recipe|
      user = users_by_id[recipe.user_id]
      Cooking::Application::Results::Recipes::RecipeWithUser.new(
        recipe: recipe,
        user: user
      )
    end

    Shared::Application::Results::PaginatedResult.new(
      data: enriched_recipes,
      pagy: paginated_result.pagy
    )
  end

  private

  attr_reader :recipe_repository, :user_repository, :pagination_params, :filters
end
