require "test_helper"
require_relative "base_controller_test"

class NotesControllerTest < BaseControllerTest
  include Devise::Test::IntegrationHelpers

  def setup
    super
    @recipe = recipes(:one)
    @note = notes(:one)
  end


  test "should show note for user" do
    get show_for_user_recipe_notes_url(@recipe)
    assert_response :success
    assert_equal @note.content, response.body
  end

  test "should create note on recipe when not existing" do
    @recipe.notes.destroy_all
    assert_difference "@recipe.notes.count", 1 do
      patch update_for_user_recipe_notes_url(@recipe), params: { note: { content: "Test note" } }
    end
    assert_redirected_to @recipe
  end

  test "should update note on recipe" do
    assert_no_difference "@recipe.notes.count", 1 do
      patch update_for_user_recipe_notes_url(@recipe), params: { note: { content: "Test note" } }
    end
    assert_redirected_to @recipe
  end

  test "should not create or update note when not signed in" do
    sign_out @user
    assert_no_difference "@recipe.notes.count" do
      patch update_for_user_recipe_notes_url(@recipe), params: { note: { content: "Test note" } }
    end
  end
end
