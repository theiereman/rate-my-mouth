require "test_helper"

class AchievementRulesTest < ActiveSupport::TestCase
  setup do
    @user = users(:no_relationship_user)

    @other_user = users(:no_relationship_user).dup
    @other_user.username = "OtherUser"
    @other_user.email = "otheruser@mail.com"
    @other_user.password = "password123"
    @other_user.password_confirmation = "password123"
    @other_user.save!

    @recipe = recipes(:no_relationship_recipe)
  end

  private

  def create_test_recipe(user, name: "Test Recipe", servings: 4, difficulty: :easy)
    recipe = user.recipes.build(
      name: name,
      number_of_servings: servings,
      difficulty: difficulty,
      description: "Test description"
    )
    recipe.save!

    recipe.ingredients.create!(name: "Ingredient 1")
    recipe.ingredients.create!(name: "Ingredient 2")
    recipe.instructions.create!(name: "Step 1")
    recipe.instructions.create!(name: "Step 2")

    recipe
  end

  def create_multiple_recipes(user, count, name_prefix: "Recipe")
    count.times.map do |i|
      create_test_recipe(user, name: "#{name_prefix} #{i}")
    end
  end

  def create_rating(recipe, user, value)
    recipe.ratings.create!(value: value, user: user)
  end

  def create_comment(recipe, user, content = "Test comment")
    recipe.comments.create!(content: content, user: user)
  end

  test "first_recipe achievement is unlocked when user creates first recipe" do
    assert_difference -> { @other_user.user_achievements.where(key: "first_recipe").count }, 1 do
      create_test_recipe(@other_user)
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @other_user.user_achievements.find_by(key: "first_recipe")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "first_comment achievement is unlocked when user creates first comment" do
    assert_difference -> { @user.user_achievements.where(key: "first_comment").count }, 1 do
      create_comment(@recipe, @user)
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "first_comment")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "first_rating achievement is unlocked when user creates first rating" do
    assert_difference -> { @user.user_achievements.where(key: "first_rating").count }, 1 do
      create_rating(@recipe, @user, 4.5)
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "first_rating")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "great_audience achievement is unlocked when user rates 10 recipes with maximum score" do
    # Créer 10 recettes pour pouvoir les noter
    recipes = create_multiple_recipes(@other_user, 10, name_prefix: "Recipe to Rate")

    # Noter les 9 premières recettes avec la note maximale
    recipes[0..8].each do |recipe|
      create_rating(recipe, @other_user, 5.0)
    end

    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @other_user.user_achievements.find_by(key: "great_audience")

    # Noter la 10ème recette et vérifier que l'achievement est débloqué
    assert_difference -> { @other_user.user_achievements.where(key: "great_audience").count }, 1 do
      create_rating(recipes.last, @other_user, 5.0)
    end
  end

  test "hater achievement is unlocked when user rates 10 recipes with minimum score" do
    # Créer 10 recettes pour pouvoir les noter
    recipes = create_multiple_recipes(@other_user, 10, name_prefix: "Recipe to Hate")

    # Noter les 9 premières recettes avec la note minimale
    recipes[0..8].each do |recipe|
      create_rating(recipe, @user, 0.5)
    end

    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "hater")

    # Noter la 10ème recette et vérifier que l'achievement est débloqué
    assert_difference -> { @user.user_achievements.where(key: "hater").count }, 1 do
      create_rating(recipes.last, @user, 0.5)
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "hater")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "food_critique achievement is unlocked when user rates 10 recipes with a comment" do
    # Créer un utilisateur propre pour ce test
    critique_user = Users::Models::User.create!(
      username: "CritiqueUser",
      email: "critique@example.com",
      password: "password123",
      password_confirmation: "password123"
    )

    # Créer 10 recettes pour pouvoir les noter
    recipes = create_multiple_recipes(@other_user, 10, name_prefix: "Recipe to Critique")

    # Noter et commenter seulement 9 recettes
    recipes[0..8].each do |recipe|
      create_rating(recipe, critique_user, 4.0)
      create_comment(recipe, critique_user)
    end

    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil critique_user.user_achievements.find_by(key: "food_critique")

    # Ajouter une note à la 10ème recette
    create_rating(recipes.last, critique_user, 4.0)

    # Vérifier que l'achievement n'est toujours pas débloqué (il manque le commentaire)
    assert_nil critique_user.user_achievements.find_by(key: "food_critique")

    # Ajouter le commentaire et vérifier que l'achievement est débloqué
    assert_difference -> { critique_user.user_achievements.where(key: "food_critique").count }, 1 do
      create_comment(recipes.last, critique_user)
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = critique_user.user_achievements.find_by(key: "food_critique")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "bad_reputation achievement is unlocked when user has a bad reputation" do
    # Créer 10 recettes pour pouvoir les noter
    recipes = create_multiple_recipes(@user, 10, name_prefix: "Recipe to Rate")

    achievement = @user.user_achievements.find_by(key: :bad_reputation)
    assert_nil achievement

    # Noter les 10 recettes avec une note inférieure à 2
    recipes.each do |recipe|
      create_rating(recipe, @other_user, 1.0)
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: :bad_reputation)
    assert_not_nil achievement
  end

  test "feast achievement is unlocked when user creates a recipe for 10 or more people" do
    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "feast")

    # Créer une recette avec moins de 10 personnes
    create_test_recipe(@user, name: "Small Recipe", servings: 4)

    # Vérifier que l'achievement n'est toujours pas débloqué
    assert_nil @user.user_achievements.find_by(key: "feast")

    # Créer une recette avec 10 personnes et vérifier que l'achievement est débloqué
    assert_difference -> { @user.user_achievements.where(key: "feast").count }, 1 do
      create_test_recipe(@user, name: "Big Feast Recipe", servings: 10)
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "feast")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "spammer achievement is unlocked when user adds 10 comments on the same recipe" do
    # Créer une recette pour pouvoir commenter
    recipe = create_test_recipe(@user, name: "Recipe to Comment A Lot")

    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "spammer")

    # Ajouter 9 commentaires
    9.times do |i|
      create_comment(recipe, @user, "Comment #{i}")
    end

    # Vérifier que l'achievement n'est toujours pas débloqué
    assert_nil @user.user_achievements.find_by(key: "spammer")

    # Ajouter le 10ème commentaire et vérifier que l'achievement est débloqué
    assert_difference -> { @user.user_achievements.where(key: "spammer").count }, 1 do
      create_comment(recipe, @user, "Comment 10")
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "spammer")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "code_explorer achievement can be manually unlocked" do
    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "code_explorer")

    # Créer manuellement l'achievement
    Users::Models::UserAchievement.create!(
      user: @user,
      key: "code_explorer",
      unlocked_at: Time.current
    )

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "code_explorer")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "birthday achievement is unlocked when creating a recipe exactly one year after account creation" do
    # Set user creation date to exactly one year ago
    creation_time = Time.current - 1.year
    @user.update!(created_at: creation_time)

    # Verify achievement is not unlocked yet
    assert_nil @user.user_achievements.find_by(key: "birthday")

    # Create a recipe and verify the achievement is unlocked
    travel_to(creation_time + 1.year) do
      assert_difference -> { @user.user_achievements.where(key: "birthday").count }, 1 do
        recipe = @user.recipes.build(
          name: "Anniversary Recipe",
          number_of_servings: 2,
          description: "Test description"
        )
        recipe.save!
        recipe.ingredients.create!(name: "Love")
        recipe.ingredients.create!(name: "Time")
        recipe.instructions.create!(name: "Mix well")
        recipe.instructions.create!(name: "Enjoy the moment")
      end
    end

    # Verify the achievement has been unlocked
    achievement = @user.user_achievements.find_by(key: "birthday")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "romantic achievement is unlocked when creating a recipe on Valentine's Day" do
    # Verify achievement is not unlocked yet
    assert_nil @user.user_achievements.find_by(key: "romantic")

    # Create a recipe on Valentine's Day and verify the achievement is unlocked
    travel_to(Time.new(2024, 2, 14, 12, 0, 0)) do
      assert_difference -> { @user.user_achievements.where(key: "romantic").count }, 1 do
        recipe = @user.recipes.build(
          name: "Valentine's Special",
          number_of_servings: 2,
          description: "Test description"
        )
        recipe.save!
        recipe.ingredients.create!(name: "Chocolate")
        recipe.ingredients.create!(name: "Strawberries")
        recipe.instructions.create!(name: "Prepare with love")
        recipe.instructions.create!(name: "Serve with a smile")
      end
    end

    # Verify the achievement has been unlocked
    achievement = @user.user_achievements.find_by(key: "romantic")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "marathonian achievement is unlocked when creating 5 recipes in one day" do
    # Verify achievement is not unlocked yet
    assert_nil @user.user_achievements.find_by(key: "marathonian")

    # Create 4 recipes
    travel_to(Time.new(2024, 3, 15, 10, 0, 0)) do
      4.times do |i|
        create_test_recipe(@user, name: "Recipe #{i + 1}")
      end

      # Verify achievement is still not unlocked
      assert_nil @user.user_achievements.find_by(key: "marathonian")

      # Create the 5th recipe and verify the achievement is unlocked
      assert_difference -> { @user.user_achievements.where(key: "marathonian").count }, 1 do
        create_test_recipe(@user, name: "Recipe 5")
      end
    end

    # Verify the achievement has been unlocked
    achievement = @user.user_achievements.find_by(key: "marathonian")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end
end
