require "test_helper"

class NewCommentToAuthorNotifierTest < ActiveSupport::TestCase
  include ActionMailer::TestHelper

  setup do
    @commenter = users(:no_relationship_user)
    @recipe_one = recipes(:one)
    @recipe_two = recipes(:two)
    @recipe_one_author = @recipe_one.user
    @recipe_two_author = @recipe_two.user
  end

  test "should notify author after new comment" do
    assert_difference -> { @recipe_one_author.notifications.count }, 1 do
      Comment.create(user: @commenter, commentable: @recipe_one, content: "Great recipe!")
    end
  end

  test "should notify every commenter except the author" do
    @recipe_one.commenters.each do |commenter|
      if (commenter.id == @recipe_one.user.id) || (commenter.id == @commenter.id)
        assert_no_difference -> { commenter.notifications.where(type: "NewCommentToOtherCommentersNotifier::Notification").count } do
          Comment.create(user: @commenter, commentable: @recipe_one, content: "Great recipe!")
        end
      else
        assert_difference -> { commenter.notifications.where(type: "NewCommentToOtherCommentersNotifier::Notification").count }, 1 do
          Comment.create(user: @commenter, commentable: @recipe_one, content: "Great recipe!")
        end
      end
    end
  end

  test "should not notify if commenting own recipe" do
    assert_no_difference -> {
      @recipe_one_author.notifications
        .where(type: ["NewCommentToOtherCommentersNotifier::Notification", "NewCommentToAuthorNotifier::Notification"]).count
    } do
      Comment.create(user: @recipe_one_author, commentable: @recipe_one, content: "Great recipe!")
    end
  end

  test "should not send email if notification preference is disabled" do
    @recipe_one_author.notification_preference = false
    @recipe_one_author.save!

    assert_emails 0 do
      Comment.create(user: @commenter, commentable: @recipe_one, content: "Great recipe!")
    end
  end
end
