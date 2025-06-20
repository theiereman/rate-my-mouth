require "test_helper"

class CommentTest < ActiveSupport::TestCase
  def setup
    @comment = comments(:one)
    @user = users(:one)
    @recipe = recipes(:one)
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
end
