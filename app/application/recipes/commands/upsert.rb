class Recipes::Commands::Upsert < CommandBase
  def initialize(user:, params:)
    @user = user
    @params = params
  end

  def call
    if @params[:id]
      recipe = Recipes::Models::Recipe.find(@params[:id])
      recipe.assign_attributes(recipe_attributes)
    else
      recipe = Recipes::Models::Recipe.new(recipe_attributes)
    end

    recipe.user = @user
    recipe.tags = Tags::Commands::FindOrCreate.call(tags: @params.to_h[:tags_attributes] || []).data[:tags]

    if recipe.save
      CommandResult.success({recipe: recipe})
    else
      CommandResult.failure(recipe.errors)
    end
  end

  private

  def recipe_attributes
    @params.except(:tags_attributes)
  end
end
