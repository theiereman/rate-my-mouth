class Recipes::Presenters::Base
  def initialize(recipe)
    @recipe = recipe
  end

  def thumbnail_url
    if @recipe.thumbnail.attached?
      Rails.application.routes.url_helpers.rails_blob_path(@recipe.thumbnail, only_path: true)
    end
  end

  def average_rating
    return 0.0 if @recipe.ratings_count == 0
    @recipe.ratings.reduce(0) { |sum, rating| sum + rating.value }.to_f / @recipe.ratings_count
  end
end
