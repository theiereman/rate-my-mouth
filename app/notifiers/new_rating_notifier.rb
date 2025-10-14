# To deliver this notification:
#
# NewRatingNotifier.with(record: @rating).deliver
class NewRatingNotifier < ApplicationNotifier
  recipients :recipe_author

  deliver_by :email do |config|
    config.mailer = "RatingMailer"
    config.method = :new_rating
  end

  validates :record, presence: true

  private

  def recipe_author
    return nil if record.user.id == record.recipe.user.id
    record.recipe.user
  end
end
