require "test_helper"
require_relative "base_controller_test"

class CommentsControllerTest < BaseControllerTest
  def setup
    super
    @recipe = recipes(:one)
    @comment = @recipe.comments.create!(content: "Test comment", user: @user)
  end

  test "should create comment on recipe" do
    @recipe.comments.destroy_all
    assert_difference "@recipe.comments.count", 1 do
      post recipe_comments_url(@recipe), params: {comment: {content: "Test comment"}}
    end
    assert_redirected_to @recipe
  end

  test "should not create comment when not signed in" do
    sign_out @user
    assert_no_difference "@recipe.comments.count" do
      post recipe_comments_url(@recipe), params: {comment: {content: "Test comment"}}
    end
  end

  test "should update comment on recipe" do
    patch recipe_comment_url(@recipe, @comment), params: {comment: {content: "Updated comment"}}
    @comment.reload
    assert_equal "Updated comment", @comment.content
    assert_redirected_to @recipe
  end

  test "should not update comment by other user" do
    sign_in @other_user
    patch recipe_comment_url(@recipe, @comment), params: {comment: {content: "Hacked comment"}}
    @comment.reload
    assert_not_equal "Hacked comment", @comment.content
    assert_redirected_to @recipe
  end

  test "should destroy comment on recipe" do
    assert_difference "@recipe.comments.count", -1 do
      delete recipe_comment_url(@recipe, @comment)
    end
    assert_redirected_to @recipe
  end

  test "should not destroy comment by other user" do
    sign_in @other_user
    assert_no_difference "@recipe.comments.count" do
      delete recipe_comment_url(@recipe, @comment)
    end
    assert_redirected_to @recipe
  end
end
