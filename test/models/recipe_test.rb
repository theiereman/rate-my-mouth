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
    assert_respond_to Recipe, :difficulties

    @recipe.difficulty = :easy
    assert_equal "easy", @recipe.difficulty
    assert_equal 0, @recipe.difficulty_value

    @recipe.difficulty = :medium
    assert_equal "medium", @recipe.difficulty
    assert_equal 1, @recipe.difficulty_value

    @recipe.difficulty = :hard
    assert_equal "hard", @recipe.difficulty
    assert_equal 2, @recipe.difficulty_value

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

  # Tests de la méthode average_rating
  test "should return 0.0 for average_rating when no ratings" do
    @recipe.ratings.destroy_all
    assert_equal 0.0, @recipe.average_rating
  end

  test "should calculate correct average_rating" do
    @recipe.ratings.destroy_all
    @recipe.ratings.create!(value: 3.0, user: @recipe.user)
    @recipe.ratings.create!(value: 5.0, user: @other_user)
    assert_equal 4.0, @recipe.average_rating
  end

  # Tests de la méthode thumbnail_url
  test "should return nil for thumbnail_url when no thumbnail attached" do
    assert_nil @recipe.thumbnail_url
  end

  # Tests des scopes de filtrage
  test "should filter by name" do
    results = Recipe.filter_by_name("ABC")
    assert_equal results, []

    results = Recipe.filter_by_name("Gâteau")
    assert_includes results, recipes(:one)
    assert_not_includes results, recipes(:two)
  end

  test "should filter by user_id" do
    user2 = users(:two)

    results = Recipe.filter_by_user_id(user2.id)
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
    results = Recipe.filter_by_tags_ids([ tag1.id ])
    assert_includes results, @recipe
    assert_includes results, recipe2

    # Filtre par plusieurs tags (AND logic)
    results = Recipe.filter_by_tags_ids([ tag1.id, tag2.id ])
    assert_includes results, recipe2
    assert_not_includes results, @recipe
  end

  # Tests de la gestion des tags
  test "should handle tags_attributes assignment" do
    tag_params = [
      { name: "dessert" },
      { name: "facile" }
    ]

    @recipe.tags_attributes = tag_params

    assert_equal 2, @recipe.tags.count
    tag_names = @recipe.tags.pluck(:name)
    assert_includes tag_names, "dessert"
    assert_includes tag_names, "facile"
  end

  test "should handle tags_attributes with existing tag ids" do
    existing_tag = tags(:one)
    tag_params = [
      { id: existing_tag.id, name: existing_tag.name },
      { name: "nouveau" }
    ]

    @recipe.tags_attributes = tag_params


    assert_equal 2, @recipe.tags.count
    assert_includes @recipe.tags, existing_tag
    assert @recipe.tags.exists?(name: "nouveau")
  end

  test "should find or create tags by name case insensitively" do
    # Créer un tag en minuscules
    existing_tag = @recipe.find_or_create_tag_by_name("dessert")

    # Essayer de créer le même tag en majuscules
    same_tag = @recipe.find_or_create_tag_by_name("DESSERT")

    assert_equal existing_tag, same_tag
  end

  test "should clear existing tags when assigning new tags_attributes" do
    old_tag = tags(:one)
    assert_includes @recipe.tags, old_tag

    @recipe.tags_attributes = [ { name: "nouveau_tag" } ]


    assert_not_includes @recipe.tags, old_tag
    assert @recipe.tags.exists?(name: "nouveau_tag")
  end

  test "should skip blank tag names in tags_attributes" do
    tag_params = [
      { name: "valide" },
      { name: "" },
      { name: "  " }
    ]

    @recipe.tags_attributes = tag_params


    assert_equal 1, @recipe.tags.count
    assert_equal "valide", @recipe.tags.first.name
  end

  # Tests de destruction des associations
  test "should destroy associated ingredients when recipe is destroyed" do
    ingredient = @recipe.ingredients.create!(name: "Test ingredient", category: "test")
    ingredient_id = ingredient.id

    @recipe.destroy

    assert_not Ingredient.exists?(ingredient_id)
  end

  test "should destroy associated instructions when recipe is destroyed" do
    instruction = @recipe.instructions.create!(name: "Test instruction", category: "test")
    instruction_id = instruction.id

    @recipe.destroy

    assert_not Instruction.exists?(instruction_id)
  end

  test "should destroy associated ratings when recipe is destroyed" do
    rating = @recipe.ratings.create!(value: 4.0, user: @other_user)
    rating_id = rating.id

    @recipe.destroy

    assert_not Rating.exists?(rating_id)
  end

  test "should destroy associated comments when recipe is destroyed" do
    comment = @recipe.comments.create!(content: "Test comment", user: @user)
    comment_id = comment.id

    @recipe.destroy

    assert_not Comment.exists?(comment_id)
  end

  test "should destroy associated notes when recipe is destroyed" do
    note = @recipe.notes.create!(content: "Test note", user: @other_user)
    note_id = note.id

    @recipe.destroy

    assert_not Note.exists?(note_id)
  end

  test "should destroy associated recipe_tags when recipe is destroyed" do
    recipe_tag_id = @recipe.recipe_tags.first.id

    tag = @recipe.recipe_tags.first.tag

    @recipe.destroy

    assert_not RecipeTag.exists?(recipe_tag_id)
    # Le tag lui-même ne doit pas être supprimé
    assert Tag.exists?(tag.id)
  end

  # Tests des attributs par défaut
  test "should have default difficulty as easy" do
    recipe = Recipe.new(name: "Test", user: @user, number_of_servings: 4)
    assert_equal "easy", recipe.difficulty
  end

  test "should handle invalid tag id in tags_attributes gracefully" do
    tag_params = [
      { id: 99999, name: "inexistant" }, # ID qui n'existe pas
      { name: "nouveau" }
    ]

    @recipe.tags_attributes = tag_params


    # Les deux tags doivent être créés par nom
    assert_equal 2, @recipe.tags.count
    tag_names = @recipe.tags.pluck(:name)
    assert_includes tag_names, "inexistant"
    assert_includes tag_names, "nouveau"
  end

  test "should not create duplicate tags when using find_or_create_tag_by_name" do
    initial_tag_count = Tag.count

    # Créer le même tag plusieurs fois
    @recipe.find_or_create_tag_by_name("unique_tag")
    @recipe.find_or_create_tag_by_name("unique_tag")
    @recipe.find_or_create_tag_by_name("UNIQUE_TAG") # Test case insensitive

    # Un seul tag doit être créé
    assert_equal initial_tag_count + 1, Tag.count
    assert_equal 1, @recipe.tags.where("lower(name) = ?", "unique_tag").count
  end

  test "should handle filter_by_name case insensitively" do
    @recipe.name = "Gâteau au Chocolat"

    results = Recipe.filter_by_name("gâteau")
    assert_includes results, @recipe

    results = Recipe.filter_by_name("CHOCOLAT")
    assert_includes results, @recipe

    results = Recipe.filter_by_name("GâTeAu")
    assert_includes results, @recipe
  end
end
