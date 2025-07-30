require "test_helper"
require_relative "base_controller_test"

class RecipesControllerTest < BaseControllerTest
  include Pagy::Backend

  setup do
    @recipe = recipes(:one)
  end

  test "should get index" do
    get recipes_url
    assert_response :success
  end

  test "should get new" do
    get new_recipe_url
    assert_response :success
  end

  test "should create minimal recipe" do
    assert_difference("Recipes::Models::Recipe.count") do
      post recipes_url, params: {recipe: {
        name: @recipe.name,
        url: @recipe.url
      }}
    end

    assert_redirected_to recipe_url(Recipes::Models::Recipe.last)
  end

  test "should create recipe with all attributes" do
    assert_difference("Recipes::Models::Recipe.count") do
      post recipes_url, params: {recipe: {
        name: @recipe.name,
        url: @recipe.url,
        description: @recipe.description,
        number_of_servings: @recipe.number_of_servings,
        difficulty: @recipe.difficulty,
        ingredients_attributes: @recipe.ingredients.map { |i| i.attributes.slice("name", "category") },
        instructions_attributes: @recipe.instructions.map { |i| i.attributes.slice("name", "category") },
        tags_attributes: @recipe.tags.map { |t| t.attributes.slice("name") },
        thumbnail: fixture_file_upload("meme.png", "image/png")
      }}
    end
  end

  test "should create a recipe with only string attributes" do
    assert_difference("Recipes::Models::Recipe.count") do
      post recipes_url, params: {recipe: {
        name: "Test Recipe",
        url: "http://example.com/test-recipe",
        description: "This is a test recipe.",
        number_of_servings: "4",
        difficulty: "1",
        ingredients_attributes: [{name: "Test Ingredient", category: "Test Category"}],
        instructions_attributes: [{name: "Test Instruction", category: "Test Category"}],
        tags_attributes: [{name: "Test Tag"}],
        thumbnail: fixture_file_upload("meme.png", "image/png")
      }}
    end
    assert_redirected_to recipe_url(Recipes::Models::Recipe.last)
  end

  test "should not create recipe when not logged in" do
    sign_out @user
    assert_no_difference("Recipes::Models::Recipe.count") do
      post recipes_url, params: {recipe: {name: @recipe.name, url: @recipe.url}}
    end
    assert_redirected_to new_user_session_url
  end

  test "should show recipe" do
    get recipe_url(@recipe)
    assert_response :success
  end

  test "should get edit" do
    get edit_recipe_url(@recipe)
    assert_response :success
  end

  test "should update recipe" do
    patch recipe_url(@recipe), params: {recipe: {name: @recipe.name, url: @recipe.url}}
    assert_redirected_to recipe_url(@recipe)
  end

  test "should destroy recipe" do
    assert_difference("Recipes::Models::Recipe.count", -1) do
      delete recipe_url(@recipe)
    end

    assert_redirected_to recipes_url
  end
end
