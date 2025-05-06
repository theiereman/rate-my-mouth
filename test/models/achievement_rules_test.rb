require "test_helper"

class AchievementRulesTest < ActiveSupport::TestCase
  setup do
    # Créer un utilisateur de test
    @user = User.create!(
      username: "test_user",
      email: "test@example.com",
      password: "password123"
    )
  end

  teardown do
    @user.destroy if @user.present?
  end

  test "first_recipe achievement is unlocked when user creates first recipe" do
    assert_difference -> { @user.user_achievements.where(key: "first_recipe").count }, 1 do
      @user.recipes.create!(
        name: "Test Recipe",
        number_of_servings: 4,
        ingredients: [ "Ingredient 1", "Ingredient 2" ],
        instructions: [ "Step 1", "Step 2" ]
      )
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "first_recipe")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "first_comment achievement is unlocked when user creates first comment" do
    # Créer une recette pour pouvoir commenter
    recipe = @user.recipes.create!(
      name: "Recipe to Comment",
      number_of_servings: 4,
      ingredients: [ "Ingredient 1", "Ingredient 2" ],
      instructions: [ "Step 1", "Step 2" ]
    )

    assert_difference -> { @user.user_achievements.where(key: "first_comment").count }, 1 do
      recipe.comments.create!(
        content: "This is a test comment",
        user: @user
      )
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "first_comment")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "first_rating achievement is unlocked when user creates first rating" do
    # Créer une recette pour pouvoir noter
    recipe = @user.recipes.create!(
      name: "Recipe to Rate",
      number_of_servings: 4,
      ingredients: [ "Ingredient 1", "Ingredient 2" ],
      instructions: [ "Step 1", "Step 2" ]
    )

    assert_difference -> { @user.user_achievements.where(key: "first_rating").count }, 1 do
      recipe.ratings.create!(
        value: 4.5,
        user: @user
      )
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "first_rating")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "great_audience achievement is unlocked when user rates 10 recipes with maximum score" do
    # Créer 10 recettes pour pouvoir les noter
    recipes = []
    10.times do |i|
      recipes << Recipe.create!(
        name: "Recipe to Rate #{i}",
        user: User.first, # Utiliser un autre utilisateur pour la recette
        number_of_servings: 4,
        ingredients: [ "Ingredient 1", "Ingredient 2" ],
        instructions: [ "Step 1", "Step 2" ]
      )
    end

    # Noter les 9 premières recettes avec la note maximale
    recipes[0..8].each do |recipe|
      Rating.create!(
        value: 5.0,
        recipe: recipe,
        user: @user
      )
    end

    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "great_audience")

    # Noter la 10ème recette et vérifier que l'achievement est débloqué
    assert_difference -> { @user.user_achievements.where(key: "great_audience").count }, 1 do
      Rating.create!(
        value: 5.0,
        recipe: recipes.last,
        user: @user
      )
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "great_audience")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "hater achievement is unlocked when user rates 10 recipes with minimum score" do
    # Créer 10 recettes pour pouvoir les noter
    recipes = []
    10.times do |i|
      recipes << Recipe.create!(
        name: "Recipe to Hate #{i}",
        user: User.first, # Utiliser un autre utilisateur pour la recette
        number_of_servings: 4,
        ingredients: [ "Ingredient 1", "Ingredient 2" ],
        instructions: [ "Step 1", "Step 2" ]
      )
    end

    # Noter les 9 premières recettes avec la note minimale
    recipes[0..8].each do |recipe|
      Rating.create!(
        value: 0.5,
        recipe: recipe,
        user: @user
      )
    end

    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "hater")

    # Noter la 10ème recette et vérifier que l'achievement est débloqué
    assert_difference -> { @user.user_achievements.where(key: "hater").count }, 1 do
      Rating.create!(
        value: 0.5,
        recipe: recipes.last,
        user: @user
      )
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "hater")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "food_critique achievement is unlocked when user rates 10 recipes with a comment" do
    # Créer 10 recettes pour pouvoir les noter
    recipes = []
    10.times do |i|
      recipes << Recipe.create!(
        name: "Recipe to Critique #{i}",
        user: @user, # Utiliser un autre utilisateur pour la recette
        number_of_servings: 4,
        ingredients: [ "Ingredient 1", "Ingredient 2" ],
        instructions: [ "Step 1", "Step 2" ]
      )
    end

    # Noter les 9 premières recettes avec un commentaire
    recipes[0..8].each do |recipe|
      recipe.ratings.create!(
        value: 4.0,
        user: @user
      )
      recipe.comments.create!(
        content: "This is a test comment",
        user: @user
      )
    end

    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "food_critique")

    # Noter la 10ème recette avec un commentaire et vérifier que l'achievement est débloqué
    assert_difference -> { @user.user_achievements.where(key: "food_critique").count }, 1 do
      recipes.last.comments.create!(
        content: "This is a test comment",
        user: @user,
      )
      recipes.last.ratings.create!(
        value: 4.0,
        user: @user
      )
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "food_critique")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end
end
