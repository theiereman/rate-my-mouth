require "test_helper"

class AchievementUnlockerServiceTest < ActiveSupport::TestCase
  setup do
    @user = users(:no_relationship_user)
    @other_user = users(:no_relationship_user).dup
    @other_user.username = "OtherUser"
    @other_user.email = "otheruser@mail.com"
    @other_user.password = "password123"
    @other_user.password_confirmation = "password123"
    @other_user.save!
  end

  test "unlocks achievement and creates notification when condition is met" do
    # Vérifier qu'un événement Noticed est créé lors du déblocage d'un achievement
    # et qu'un UserAchievement est créé
    assert_difference "Noticed::Event.count" do
      assert_difference "@user.user_achievements.count" do
        create_test_recipe(@user)
      end
    end

    # Vérifier que l'achievement a été créé
    achievement = @user.user_achievements.find_by(key: "first_recipe")
    assert_not_nil achievement
    assert_not_nil achievement.unlocked_at

    # Vérifier que l'événement correspond au bon notifier
    event = Noticed::Event.last
    assert_equal "AchievementUnlockedNotifier", event.type
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

  test "does not create notification if achievement already unlocked" do
    # Débloquer l'achievement manuellement
    @user.user_achievements.create!(key: "first_recipe", unlocked_at: Time.current)

    # Aucun nouvel achievement ni notification ne doit être créé car l'achievement est déjà débloqué
    assert_no_difference "Noticed::Event.count" do
      assert_no_difference "@user.user_achievements.count" do
        create_test_recipe(@user)
      end
    end
  end
end
