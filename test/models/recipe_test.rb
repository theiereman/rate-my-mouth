require "test_helper"

class RecipeTest < ActiveSupport::TestCase
  def setup
    @recipe = recipes(:one)
    @user = users(:one)
    @other_user = users(:no_relationship_user)
  end

  # Tests de validations de base
  test "should be valid with valid attributes" do
    assert @recipe.valid?
  end

  test "should require name" do
    @recipe.name = nil
    assert_not @recipe.valid?
    assert_includes @recipe.errors[:name], "can't be blank"
  end

  test "should require positive number_of_servings" do
    @recipe.number_of_servings = 0
    assert_not @recipe.valid?
    assert_includes @recipe.errors[:number_of_servings], "must be greater than 0"

    @recipe.number_of_servings = -1
    assert_not @recipe.valid?
    assert_includes @recipe.errors[:number_of_servings], "must be greater than 0"
  end

  test "should require integer number_of_servings" do
    @recipe.number_of_servings = 2.5
    assert_not @recipe.valid?
    assert_includes @recipe.errors[:number_of_servings], "must be an integer"
  end

  test "should require user" do
    @recipe.user = nil
    assert_not @recipe.valid?
  end

  # Tests de l'enum difficulty
  test "should handle difficulty enum" do
    assert_respond_to @recipe, :difficulty
    assert_respond_to Recipes::Models::Recipe, :difficulties

    @recipe.difficulty = 0
    assert_equal "easy", @recipe.difficulty

    @recipe.difficulty = 1
    assert_equal "medium", @recipe.difficulty

    @recipe.difficulty = 2
    assert_equal "hard", @recipe.difficulty
  end

  test "should not set invalid difficulty values" do
    @recipe.difficulty = :easy
    assert @recipe.valid?

    @recipe.difficulty = 0
    assert @recipe.valid?
    assert @recipe.difficulty = :easy

    assert_raises ArgumentError do
      @recipe.difficulty = :invalid_value
    end
  end

  # Tests des scopes de filtrage
  test "should filter by name" do
    results = Recipes::Models::Recipe.filter_by_name("ABC")
    assert_equal results, []

    results = Recipes::Models::Recipe.filter_by_name("Gâteau")
    assert_includes results, recipes(:one)
    assert_not_includes results, recipes(:two)
  end

  test "should filter by user_id" do
    user2 = users(:two)

    results = Recipes::Models::Recipe.filter_by_user_id(user2.id)
    assert_includes results, recipes(:two)
    assert_not_includes results, @recipe
  end

  test "should filter by tags_ids" do
    tag1 = tags(:one)
    tag2 = tags(:two)

    # recipe1 is set with fixtures

    recipe2 = recipes(:two)
    recipe2.tags << tag2
    recipe2.tags << tag1
    recipe2.save!

    # Filtre par un seul tag
    results = Recipes::Models::Recipe.filter_by_tags_ids([tag1.id])
    assert_includes results, @recipe
    assert_includes results, recipe2

    # Filtre par plusieurs tags (AND logic)
    results = Recipes::Models::Recipe.filter_by_tags_ids([tag1.id, tag2.id])
    assert_includes results, recipe2
    assert_not_includes results, @recipe
  end
  # Tests de destruction des associations
  test "should destroy associated ingredients when recipe is destroyed" do
    ingredient = @recipe.ingredients.create!(name: "Test ingredient", category: "test")
    ingredient_id = ingredient.id

    @recipe.destroy

    assert_not Recipes::Models::Ingredient.exists?(ingredient_id)
  end

  test "should destroy associated instructions when recipe is destroyed" do
    instruction = @recipe.instructions.create!(name: "Test instruction", category: "test")
    instruction_id = instruction.id

    @recipe.destroy

    assert_not Recipes::Models::Instruction.exists?(instruction_id)
  end

  test "should destroy associated ratings when recipe is destroyed" do
    rating = @recipe.ratings.create!(value: 4.0, user: @other_user)
    rating_id = rating.id

    @recipe.destroy

    assert_not Recipes::Models::Rating.exists?(rating_id)
  end

  test "should destroy associated comments when recipe is destroyed" do
    comment = @recipe.comments.create!(content: "Test comment", user: @user)
    comment_id = comment.id

    @recipe.destroy

    assert_not Recipes::Models::Comment.exists?(comment_id)
  end

  test "should destroy associated notes when recipe is destroyed" do
    note = @recipe.notes.create!(content: "Test note", user: @other_user)
    note_id = note.id

    @recipe.destroy

    assert_not Recipes::Models::Note.exists?(note_id)
  end

  test "should destroy associated recipe_tags when recipe is destroyed" do
    recipe_tag_id = @recipe.recipe_tags.first.id

    tag = @recipe.recipe_tags.first.tag

    @recipe.destroy

    assert_not Recipes::Models::RecipeTag.exists?(recipe_tag_id)
    # Le tag lui-même ne doit pas être supprimé
    assert Recipes::Models::Tag.exists?(tag.id)
  end

  # Tests des attributs par défaut
  test "should have default difficulty as easy" do
    recipe = Recipes::Models::Recipe.new(name: "Test", user: @user, number_of_servings: 4)
    assert_equal "easy", recipe.difficulty
  end

  test "should handle filter_by_name case insensitively" do
    @recipe.name = "Gâteau au Chocolat"

    results = Recipes::Models::Recipe.filter_by_name("gâteau")
    assert_includes results, @recipe

    results = Recipes::Models::Recipe.filter_by_name("CHOCOLAT")
    assert_includes results, @recipe

    results = Recipes::Models::Recipe.filter_by_name("GâTeAu")
    assert_includes results, @recipe
  end
end
