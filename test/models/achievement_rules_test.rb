require "test_helper"

class AchievementRulesTest < ActiveSupport::TestCase
  setup do
    # Créer un utilisateur de test
    @user = User.create!(
      username: "test_user",
      email: "test@example.com",
      password: "password123"
    )

    @other_user = User.create!(
      username: "other_user",
      email: "other@example.com",
      password: "password123"
    )
  end

  teardown do
    @user.destroy if @user.present?
    @other_user.destroy if @other_user.present?
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

  test "bad_reputation achievement is unlocked when user has a bad reputation" do
    # Créer 10 recettes pour pouvoir les noter
    recipes = []
    10.times do |i|
      recipes << Recipe.create!(
        name: "Recipe to Rate #{i}",
        user: @user, # Utiliser un autre utilisateur pour la recette
        number_of_servings: 4,
        ingredients: [ "Ingredient 1", "Ingredient 2" ],
        instructions: [ "Step 1", "Step 2" ]
      )
    end

    achievement = @user.user_achievements.find_by(key: :bad_reputation)
    assert_nil achievement

    # Noter les 10 recettes avec une note inférieure à 2
    recipes.each do |recipe|
      recipe.ratings.create!(
        value: 1.0,
        user: @other_user
      )
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: :bad_reputation)
    assert_not_nil achievement
  end

  test "feast achievement is unlocked when user creates a recipe for 10 or more people" do
    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "feast")

    # Créer une recette avec moins de 10 personnes
    @user.recipes.create!(
      name: "Small Recipe",
      number_of_servings: 4,
      ingredients: [ "Ingredient 1", "Ingredient 2" ],
      instructions: [ "Step 1", "Step 2" ]
    )

    # Vérifier que l'achievement n'est toujours pas débloqué
    assert_nil @user.user_achievements.find_by(key: "feast")

    # Créer une recette avec 10 personnes et vérifier que l'achievement est débloqué
    assert_difference -> { @user.user_achievements.where(key: "feast").count }, 1 do
      @user.recipes.create!(
        name: "Big Feast Recipe",
        number_of_servings: 10,
        ingredients: [ "Ingredient 1", "Ingredient 2", "Ingredient 3" ],
        instructions: [ "Step 1", "Step 2", "Step 3" ]
      )
    end

    # Vérifier que l'achievement a bien été débloqué
    achievement = @user.user_achievements.find_by(key: "feast")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end

  test "spammer achievement is unlocked when user adds 10 comments on the same recipe" do
    # Créer une recette pour pouvoir commenter
    recipe = @user.recipes.create!(
      name: "Recipe to Comment A Lot",
      number_of_servings: 4,
      ingredients: [ "Ingredient 1", "Ingredient 2" ],
      instructions: [ "Step 1", "Step 2" ]
    )

    # Vérifier que l'achievement n'est pas encore débloqué
    assert_nil @user.user_achievements.find_by(key: "spammer")

    # Ajouter 9 commentaires
    9.times do |i|
      recipe.comments.create!(
        content: "Comment #{i}",
        user: @user
      )
    end

    # Vérifier que l'achievement n'est toujours pas débloqué
    assert_nil @user.user_achievements.find_by(key: "spammer")

    # Ajouter le 10ème commentaire et vérifier que l'achievement est débloqué
    assert_difference -> { @user.user_achievements.where(key: "spammer").count }, 1 do
      recipe.comments.create!(
        content: "Comment 10",
        user: @user
      )
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
    UserAchievement.create!(
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
        @user.recipes.create!(
          name: "Anniversary Recipe",
          number_of_servings: 2,
          ingredients: [ "Love", "Time", "Memories" ],
          instructions: [ "Mix well", "Enjoy the moment" ]
        )
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
        @user.recipes.create!(
          name: "Valentine's Special",
          number_of_servings: 2,
          ingredients: [ "Chocolate", "Strawberries", "Champagne" ],
          instructions: [ "Prepare with love", "Serve with a smile" ]
        )
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
        @user.recipes.create!(
          name: "Recipe #{i+1}",
          number_of_servings: 4,
          ingredients: [ "Ingredient 1", "Ingredient 2" ],
          instructions: [ "Step 1", "Step 2" ]
        )
      end

      # Verify achievement is still not unlocked
      assert_nil @user.user_achievements.find_by(key: "marathonian")

      # Create the 5th recipe and verify the achievement is unlocked
      assert_difference -> { @user.user_achievements.where(key: "marathonian").count }, 1 do
        @user.recipes.create!(
          name: "Recipe 5",
          number_of_servings: 4,
          ingredients: [ "Ingredient 1", "Ingredient 2" ],
          instructions: [ "Step 1", "Step 2" ]
        )
      end
    end

    # Verify the achievement has been unlocked
    achievement = @user.user_achievements.find_by(key: "marathonian")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at
  end
end
