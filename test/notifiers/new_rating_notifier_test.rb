require "test_helper"

class NewRatingNotifierTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  setup do
    @rater = users(:no_relationship_user)
    @recipe = recipes(:one)
    @recipe_author = @recipe.user
  end

  test "should notify author after new rating" do
    assert_difference -> { @recipe_author.notifications.where(type: "NewRatingNotifier::Notification").count }, 1 do
      Rating.create(user: @rater, recipe: @recipe, value: 5)
    end
  end

  test "should not notify if rating own recipe" do
    assert_no_difference -> { Noticed::Notification.where(recipient_id: @recipe_author.id)
                              .where(type: "NewRatingNotifier::Notification").count } do
      Rating.create(user: @recipe_author, recipe: @recipe, value: 4)
    end
  end

  test "should not notify if updating rating on recipe" do
    rating = Rating.create(user: @rater, recipe: @recipe, value: 3)
    assert_no_difference -> { Noticed::Notification.where(recipient_id: @recipe_author.id)
                              .where(type: "NewRatingNotifier::Notification").count } do
      rating.update(value: 4)
    end
  end

  test "should not send email if notification preference is disabled" do
    @recipe_author.notification_preference = false
    @recipe_author.save!

    assert_emails 0 do
      Rating.create(user: @rater, recipe: @recipe, value: 5)
    end
  end
end
