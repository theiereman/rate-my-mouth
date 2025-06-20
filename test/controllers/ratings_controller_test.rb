require "test_helper"
require_relative "base_controller_test"

class RatingsControllerTest < BaseControllerTest
  def setup
    super
    @recipe = recipes(:one)
    @rating = ratings(:one)
  end

  test "should do nothing when user is not logged in" do
    sign_out @user
    assert_no_difference "@recipe.ratings.count" do
      post recipe_ratings_url(@recipe), params: { rating: { value: 5 } }
    end
    assert_redirected_to new_user_session_path
  end

  test "should create rating for user if none exists" do
    @recipe.ratings.destroy_all
    post recipe_ratings_url(@recipe), params: { rating: { value: 5 } }
    assert @recipe.ratings.count == 1
    assert_equal 5, @recipe.ratings.reload.first.value
    assert_redirected_to @recipe
  end

  test "should update rating for user if exists" do
    assert_no_difference "@recipe.ratings.count" do
      post recipe_ratings_url(@recipe), params: { rating: { value: 4 } }
    end
    @rating.reload
    assert_equal 4, @rating.value
    assert_redirected_to @recipe
  end
end
