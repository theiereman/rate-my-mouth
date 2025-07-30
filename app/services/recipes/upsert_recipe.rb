class Recipes::UpsertRecipe < ApplicationService
  def initialize(user:, params:)
    @user = user
    @params = params
  end

  def call
    if @params[:id]
      recipe = Recipe.find(@params[:id])
      recipe.assign_attributes(recipe_attributes)
    else
      recipe = Recipe.new(recipe_attributes)
    end

    recipe.user = @user
    recipe.tags = Tags::FindOrCreateTags.call(tags: @params.to_h[:tags_attributes] || []).data[:tags]

    if recipe.save
      ServiceResult.success({recipe: recipe})
    else
      ServiceResult.failure(recipe.errors)
    end
  end

  private

  def recipe_attributes
    @params.except(:tags_attributes)
  end
end
