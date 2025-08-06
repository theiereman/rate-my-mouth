class Cooking::Domain::Services::TotalRatingsService
  def initialize(rating_repo, recipe_id)
    @rating_repo = rating_repo
    @recipe_id = recipe_id
  end

  def call
    ratings = rating_repo.find_by_recipe_id(recipe_id)
    ratings.size
  end

  private

  attr_reader :rating_repo, :recipe_id
end
