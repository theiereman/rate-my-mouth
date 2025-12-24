class RecipesController < ApplicationController
  include Paginatable

  before_action :set_eager_loaded_recipe, only: %i[show]
  before_action :set_recipe, only: %i[edit update destroy]

  def index
    @recipes = Recipe.filtered(params.slice(:name, :user_id, :tags_ids).to_unsafe_h).ordered(params[:order])
    @recipes = @recipes.includes(:thumbnail_attachment, :ratings, :tags, :user)
    @pagy, @recipes = paginate_collection(@recipes)

    recipes_data = @recipes.map { |recipe| RecipePresenter.minimal_recipe_json(recipe) }
    pagy_data = @pagy.data_hash

    respond_to do |format|
      format.html {
        render inertia: "Recipe/Index", props: {recipes: recipes_data, pagy: pagy_data}
      }
      format.json {
        render json: {recipes: recipes_data, pagy: pagy_data}
      }
    end
  end

  def show
    render inertia: "Recipe/Show", props: {
      recipe: RecipePresenter.full_recipe_json(@recipe),
      userRating: Rating.find_by(user: current_user, recipe: @recipe)

    }
  end

  def new
    @recipe = Recipe.new
    render inertia: "Recipe/New", props: {
      recipe: RecipePresenter.full_recipe_json(@recipe)
    }
  end

  def edit
    render inertia: "Recipe/Edit", props: {
      recipe: RecipePresenter.full_recipe_json(@recipe)
    }
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user = current_user

    if @recipe.save
      redirect_to @recipe
    else
      redirect_to new_recipe_url, inertia: {errors: @recipe.errors}
    end
  end

  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe
    else
      redirect_to edit_recipe_url(@recipe), inertia: {errors: @recipe.errors}
    end
  end

  def destroy
    @recipe.destroy!
    redirect_to recipes_url
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
  end

  def set_eager_loaded_recipe
    @recipe = Recipe.includes(:thumbnail_attachment, :user, :tags, :ingredients, :instructions).find(params[:id])
  end

  def recipe_params
    params.require(:recipe).permit(
      :name, :description, :url, :number_of_servings, :difficulty, :thumbnail,
      ingredients_attributes: [:id, :name, :category, :_destroy],
      instructions_attributes: [:id, :name, :category, :_destroy],
      tags_attributes: [:id, :name]
    )
  end
end
