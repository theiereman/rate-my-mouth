class Recipes::UseCases::CreateRecipe
  Result = Struct.new(:success, :recipe, :error)

  def initialize(recipe_repo)
    @recipe_repo = recipe_repo
  end

  def call(params:, user_id:)
    params[:user_id] = user_id
    recipe_entity = Recipes::Entities::Recipe.new(**params)
    @recipe_repo.save(recipe_entity)
    Result.new(true, recipe_entity, nil)
  rescue ArgumentError => e
    Result.new(false, nil, e)
  end

  def self.call(recipe_repo:, params:, user_id:)
    new(recipe_repo).call(params: params, user_id: user_id)
  end
end
