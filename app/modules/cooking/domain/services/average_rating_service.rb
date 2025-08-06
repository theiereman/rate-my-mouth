class Cooking::Domain::Services::AverageRatingService
  def initialize(rating_repo, recipe_id)
    @rating_repo = rating_repo
    @recipe_id = recipe_id
  end

  def call
    ratings = rating_repo.find_by_recipe_id(recipe_id)
    return 0 if ratings.empty?

    total = ratings.sum(&:value)
    total / ratings.size
  end

  private

  attr_reader :rating_repo, :recipe_id
end
