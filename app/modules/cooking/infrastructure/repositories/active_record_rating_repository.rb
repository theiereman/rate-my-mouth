class Cooking::Infrastructure::Repositories::ActiveRecordRatingRepository < Cooking::Domain::Repositories::RatingRepository
  def find_by_recipe_id(recipe_id)
    Cooking::Infrastructure::Models::DbRating.where(recipe_id: recipe_id)
  end

  private

  def map_to_entity(db_rating)
    tag = Cooking::Domain::Entities::Rating.new(
      recipe_id: db_rating.recipe_id,
      user_id: db_rating.user_id,
      value: db_rating.value
    )
    tag.send(:id=, db_rating.id)
    tag
  end
end
