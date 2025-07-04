require "test_helper"

class AchievementUnlockedNotifierTest < ActiveSupport::TestCase
  setup do
    @user = users(:no_relationship_user)
    @user_achievement = UserAchievement.create!(
      user: @user,
      key: "first_recipe",
      unlocked_at: Time.current
    )
  end

  test "creates noticed event when achievement is unlocked" do
    assert_difference "Noticed::Event.count", 1 do
      AchievementUnlockedNotifier.with(record: @user_achievement).deliver
    end

    event = Noticed::Event.last
    assert_equal "AchievementUnlockedNotifier", event.type
  end

  test "validates presence of record" do
    notifier = AchievementUnlockedNotifier.new
    assert_not notifier.valid?
    assert_includes notifier.errors[:record], "can't be blank"
  end
end
