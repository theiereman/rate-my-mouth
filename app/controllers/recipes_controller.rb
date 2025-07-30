class RecipesController < ApplicationController
  include Paginatable

  before_action :set_recipe, only: %i[edit update]

  def index
    @recipes = Recipes::Queries::Index.call(params)

    @pagy, @recipes = paginate_collection(@recipes)

    result = {
      recipes: @recipes.map { |recipe|
        Recipes::Presenters::Index.new(recipe).as_json
      },
      pagy: pagy_metadata(@pagy)
    }

    respond_to do |format|
      format.html { render inertia: "Recipe/Index", props: result }
      format.json { render json: result }
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
