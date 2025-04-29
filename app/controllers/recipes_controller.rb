class RecipesController < ApplicationController
  before_action :set_recipe, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /recipes
  def index
    @recipes = Recipe.all.order(created_at: :desc)
    render inertia: "Recipe/Index", props: {
      recipes: @recipes.map do |recipe|
        serialize_recipe_full(recipe)
      end
    }
  end

  def search
    @recipes = Recipe.where("name LIKE ?", "%#{params[:query]}%").order(created_at: :desc)
    render inertia: "Recipe/Index", props: {
      recipes: @recipes.map do |recipe|
        serialize_recipe_full(recipe)
      end
    }
  end

  # GET /recipes/1
  def show
    render inertia: "Recipe/Show", props: {
      recipe: serialize_recipe_full(@recipe),
      userRating: Rating.find_by(user: current_user, recipe: @recipe)

    }
  end

  # GET /recipes/new
  def new
    @recipe = Recipe.new
    render inertia: "Recipe/New", props: {
      recipe: @recipe.as_json
    }
  end

  # GET /recipes/1/edit
  def edit
    render inertia: "Recipe/Edit", props: {
      recipe: @recipe.as_json
    }
  end

  # POST /recipes
  def create
    p recipe_params
    @recipe = Recipe.new(recipe_params)
    @recipe.user = current_user

    if @recipe.save
      redirect_to @recipe, notice: "Recipe was successfully created."
    else
      redirect_to new_recipe_url, inertia: { errors: @recipe.errors }
    end
  end

  # PATCH/PUT /recipes/1
  def update
    if @recipe.update(recipe_params)
      redirect_to @recipe, notice: "Recipe was successfully updated."
    else
      redirect_to edit_recipe_url(@recipe), inertia: { errors: @recipe.errors }
    end
  end

  # DELETE /recipes/1
  def destroy
    @recipe.destroy!
    redirect_to recipes_url, notice: "Recipe was successfully destroyed."
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_recipe
      @recipe = Recipe.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def recipe_params
      params.expect(recipe: [ :name, :url, ingredients: [], instructions: [] ])
    end

    def serialize_recipe_full(recipe)
      recipe.as_json(include: [ :user, comments: { include: :user }, ratings: { include: :user } ], methods: :average_rating)
    end
end
