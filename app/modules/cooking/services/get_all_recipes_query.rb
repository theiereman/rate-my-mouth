class Cooking::Services::GetAllRecipesQuery
  def self.call(recipes_repo)
    new(recipes_repo).call
  end

  attr_reader :recipes_repo

  def initialize(recipes_repo)
    @recipes_repo = recipes_repo
  end

  def call
    recipes_repo.all
    Recipes::Models::Recipe.order(created_at: :desc)
  end
end
