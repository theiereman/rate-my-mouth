class RecipesController < ApplicationController
  include Paginatable

  before_action :set_eager_loaded_recipe, only: %i[show]
  before_action :set_recipe, only: %i[edit update destroy]

  # GET /recipes
  def index
    @recipes = Recipe.filter(params.slice(:name, :user_id, :tags_ids))
      .includes(:thumbnail_attachment, :tags, :ingredients, :instructions, user: [:avatar_attachment])
      .order(created_at: :desc)
    @pagy, @recipes = paginate_collection(@recipes)

    respond_to do |format|
      format.html {
        render inertia: "Recipe/Index", props: {
          recipes: @recipes.map do |recipe|
            recipe_as_json recipe
          end,
          pagy: pagy_metadata(@pagy)
        }
      }
      format.json {
        render json: {
          recipes: @recipes.map { |recipe|
            recipe.as_json(
              include: {
                user: {only: [:id, :username, :ratings_count]},
                tags: {}
              },
              methods: [:average_rating, :thumbnail_url]
            )
          },
          pagy: pagy_metadata(@pagy)
        }
      }
    end
  end

  # GET /recipes/1
  def show
    render inertia: "Recipe/Show", props: {
      recipe: recipe_as_json,
      userRating: Rating.find_by(user: current_user, recipe: @recipe)

    }
  end

  # GET /recipes/new
  def new
    @recipe = Recipe.new
    render inertia: "Recipe/New", props: {
      recipe: recipe_as_json
    }
  end

  # GET /recipes/1/edit
  def edit
    render inertia: "Recipe/Edit", props: {
      recipe: @recipe.as_json(include: {
        tags: {},
        ingredients: {},
        instructions: {}
      }, methods: [:average_rating, :thumbnail_url])
    }
  end

  # POST /recipes
  def create
    result = Recipes::CreateRecipe.call(user: current_user, params: recipe_params)
    if result.success?
      redirect_to result.data[:recipe]
    else
      redirect_to new_recipe_url, inertia: {errors: result.errors}
    end
  end

  # PATCH/PUT /recipes/1
  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe
    else
      redirect_to edit_recipe_url(@recipe), inertia: {errors: @recipe.errors}
    end
  end

  # DELETE /recipes/1
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

  # Only allow a list of trusted parameters through.
  def recipe_params
    params.require(:recipe).permit(
      :name, :description, :url, :number_of_servings, :difficulty, :thumbnail,
      ingredients_attributes: [:id, :name, :category, :_destroy],
      instructions_attributes: [:id, :name, :category, :_destroy],
      tags_attributes: [:id, :name]
    )
  end

  def recipe_as_json(recipe = @recipe)
    recipe.as_json(include: {
      user: {only: [:id, :username, :ratings_count]},
      tags: {},
      ingredients: {},
      instructions: {}
    }, methods: [:average_rating, :thumbnail_url])
  end
end
