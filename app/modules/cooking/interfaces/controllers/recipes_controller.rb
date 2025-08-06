class Cooking::Interfaces::Controllers::RecipesController < ApplicationController
  include Paginatable
  include Shared::Interfaces::Controllers::PaginationHelper

  before_action :set_recipe, only: %i[edit update]

  def index
    recipe_repo = Cooking::Infrastructure::Repositories::ActiveRecordRecipeRepository.new
    user_repo = Cooking::Infrastructure::Repositories::ActiveRecordUserRepository.new
    ratings_repo = Cooking::Infrastructure::Repositories::ActiveRecordRatingRepository.new

    paginated_recipes_with_users = Cooking::Application::UseCases::Recipes::GetPaginatedRecipesWithUsersQuery.call(
      recipe_repo,
      user_repo,
      pagination_params: extract_pagination_params,
      filters: {
        name: params[:name],
        user_id: params[:user_id],
        tags_ids: params[:tags_ids]
      }
    )

    response_data = {
      recipes: paginated_recipes_with_users.data.map { |recipe_with_user|
        Cooking::Interfaces::Presenters::RecipeWithUserPresenter.new(
          recipe_with_user,
          Cooking::Domain::Services::AverageRatingService.new(ratings_repo, recipe_with_user.recipe.id),
          Cooking::Domain::Services::TotalRatingsService.new(ratings_repo, recipe_with_user.recipe.id)
        ).as_json
      },
      pagination: pagy_metadata(paginated_recipes_with_users.pagy)
    }

    respond_to do |format|
      format.html { render inertia: "Recipe/Index", props: response_data }
      format.json { render json: response_data }
    end
  end

  def show
    @recipe = Recipes::Queries::Show.new(params).call
    render inertia: "Recipe/Show", props: {
      recipe: Recipes::Presenters::Show.new(@recipe, current_user).as_json
    }
  end

  def new
    render inertia: "Recipe/New"
  end

  def edit
    render inertia: "Recipe/Edit", props: {
      recipe: Recipes::Presenters::Show.new(@recipe).as_json
    }
  end

  def create
    result = Recipes::Commands::Upsert.call(user: current_user, params: recipe_params)
    if result.success?
      redirect_to result.data[:recipe]
    else
      redirect_to new_recipe_url, inertia: {errors: result.errors}
    end
  end

  def update
    result = Recipes::Commands::Upsert.call(user: current_user, params: recipe_params.merge(id: @recipe.id))
    if result.success?
      redirect_to result.data[:recipe]
    else
      redirect_to edit_recipe_url(@recipe), inertia: {errors: result.errors}
    end
  end

  def destroy
    result = Recipes::Commands::Delete.call(params: params)
    if result.success?
      redirect_to recipes_url, notice: "Recipe was successfully deleted."
    else
      redirect_to recipes_url, inertia: {errors: result.errors}
    end
  end

  private

  def set_recipe
    @recipe = Recipes::Models::Recipe.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def recipe_params
    params.require(:recipe).permit(
      :id, :name, :description, :url, :number_of_servings, :difficulty, :thumbnail,
      ingredients_attributes: [:id, :name, :category, :_destroy],
      instructions_attributes: [:id, :name, :category, :_destroy],
      tags_attributes: [:id, :name]
    )
  end
end
