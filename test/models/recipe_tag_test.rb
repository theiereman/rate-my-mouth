require "test_helper"

class RecipeTagTest < ActiveSupport::TestCase
  def setup
    @user = users(:one)
    @recipe = recipes(:two)
    @tag = tags(:two)
    @recipe_tag = Tags::Models::RecipeTag.new(recipe: @recipe, tag: @tag)
  end

  test "should be valid with recipe and tag" do
    assert @recipe_tag.valid?
  end

  test "should require recipe" do
    @recipe_tag.recipe = nil
    assert_not @recipe_tag.valid?
    assert_includes @recipe_tag.errors[:recipe], "must exist"
  end

  test "should require tag" do
    @recipe_tag.tag = nil
    assert_not @recipe_tag.valid?
    assert_includes @recipe_tag.errors[:tag], "must exist"
  end

  test "should not allow duplicate recipe-tag pairs" do
    @recipe_tag.save!
    dup = Tags::Models::RecipeTag.new(recipe: @recipe, tag: @tag)
    assert_not dup.valid?
  end
end
