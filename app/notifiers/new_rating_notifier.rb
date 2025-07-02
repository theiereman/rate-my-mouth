# To deliver this notification:
#
# NewRatingNotifier.with(record: @rating).deliver
class NewRatingNotifier < ApplicationNotifier
  recipients -> { record.recipe.user }

  deliver_by :email do |config|
    config.mailer = "RatingMailer"
    config.method = :new_rating
    config.before_enqueue = -> { throw(:abort) unless record.recipe.user.notification_preference? && record.user != record.recipe.user }
  end

  validates :record, presence: true
end
