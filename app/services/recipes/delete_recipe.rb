class Recipes::DeleteRecipe < ApplicationService
  def initialize(params:)
    @params = params
  end

  def call
    recipe = Recipe.find(@params[:id])
    if recipe.destroy
      ServiceResult.success({recipe: recipe})
    else
      ServiceResult.failure(recipe.errors)
    end
  end
end
