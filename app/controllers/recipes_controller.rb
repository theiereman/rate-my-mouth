class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show edit update destroy ]

  # GET /recipes
  def index
    @recipes = Recipe.filter(params.slice(:name, :user_id, :tags_ids)).order(created_at: :desc)
    @pagy, @recipes = pagy(@recipes, limit: params[:limit] || 20)

    respond_to do |format|
      format.html {
        render inertia: "Recipe/Index", props: {
          recipes: @recipes.map do |recipe|
            recipe_as_json recipe
          end,
          pagy: pagy_metadata(@pagy)
        }
      }
      format.json { render json: {
        recipes: @recipes.map { |recipe| recipe.as_json(methods: [ :average_rating, :difficulty_value, :thumbnail_url ]) },
        pagy: pagy_metadata(@pagy)
      }}
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
      recipe: recipe_as_json
    }
  end

  # POST /recipes
  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user = current_user

    if @recipe.save
      redirect_to @recipe
    else
      redirect_to new_recipe_url, inertia: { errors: @recipe.errors }
    end
  end

  # PATCH/PUT /recipes/1
  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe
    else
      redirect_to edit_recipe_url(@recipe), inertia: { errors: @recipe.errors }
    end
  end

  # DELETE /recipes/1
  def destroy
    @recipe.destroy!
    redirect_to recipes_url
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def recipe_params
      params.require(:recipe).permit(
        :name, :description, :url, :number_of_servings, :difficulty, :thumbnail,
        ingredients_attributes: [ :id, :name, :category, :_destroy ],
        instructions_attributes: [ :id, :name, :category, :_destroy ],
        tags_attributes: [ :id, :name ]
      )
    end

    def recipe_as_json(recipe = @recipe)
      recipe.as_json(include: {
        user: { only: [ :id, :username, :ratings_count ]  },
        tags: {},
        ingredients: {},
        instructions: {},
        comments: {
          include: {
            user: {
              only: [ :id, :username ],
              methods: [ :avatar_url ]
            }
          }
        },
        ratings: {
          include: {
            user: {
              only: [ :id, :username ],
              methods: [ :avatar_url ]
            }
          }
        }
      }, methods: [ :average_rating, :difficulty_value, :thumbnail_url ])
    end
end
