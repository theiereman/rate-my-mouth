require "test_helper"

class CommentTest < ActiveSupport::TestCase
  include ActiveJob::TestHelper

  def setup
    @comment = comments(:one)
    @user = users(:one)
    @recipe = recipes(:two)
  end

  # Tests de validations de base
  test "should be valid with valid attributes" do
    assert @comment.valid?
  end

  test "should require user" do
    @comment.user = nil
    assert_not @comment.valid?
    assert_includes @comment.errors[:user], "must exist"
  end

  test "should require commentable" do
    @comment.commentable = nil
    assert_not @comment.valid?
  end

  test "should require content" do
    @comment.content = nil
    assert_not @comment.valid?
    assert_includes @comment.errors[:content], "can't be blank"
  end

  test "should notify author after new comment" do
    assert_difference "Noticed::Event.count", 1 do
      Comment.create(user: @user, commentable: @recipe, content: "Great recipe!")
    end

    event = Noticed::Event.last
    assert_equal "NewCommentNotifier", event.type
  end

  test "should not notify if user is the recipe author" do
    assert_no_difference "Noticed::Event.count" do
      Comment.create(user: @recipe.user, commentable: @recipe, content: "Great recipe!")
    end
  end

  test "should not notify if notification preference is disabled" do
    @recipe.user.notification_preference = false
    @recipe.user.save!

    assert_no_difference "Noticed::Event.count" do
      Comment.create(user: @user, commentable: @recipe, content: "Great recipe!")
    end
  end
end
