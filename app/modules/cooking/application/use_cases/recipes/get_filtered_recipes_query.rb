class Cooking::Application::UseCases::Recipes::GetFilteredRecipesQuery
  def self.call(recipes_repo, **filters)
    new(recipes_repo, **filters).call
  end

  attr_reader :recipes_repo, :filters

  def initialize(recipes_repo, **filters)
    @recipes_repo = recipes_repo
    @filters = filters
  end

  def call
    recipes_repo.all(**filters)
  end
end
