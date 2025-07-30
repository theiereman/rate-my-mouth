class Recipes::Commands::Delete < CommandBase
  def initialize(params:)
    @params = params
  end

  def call
    recipe = Recipes::Models::Recipe.find(@params[:id])
    if recipe.destroy
      CommandResult.success({recipe: recipe})
    else
      CommandResult.failure(recipe.errors)
    end
  end
end
