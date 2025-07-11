require "test_helper"

class AchievementMailerTest < ActionMailer::TestCase
  setup do
    @user = users(:no_relationship_user)
    @user_achievement = UserAchievement.create!(
      user: @user,
      key: "first_recipe",
      unlocked_at: Time.current
    )
  end

  test "achievement_unlocked email" do
    email = AchievementMailer.with(record: @user_achievement).achievement_unlocked

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal [@user.email], email.to
  end
end
