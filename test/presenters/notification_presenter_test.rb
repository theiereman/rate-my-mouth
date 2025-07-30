require "test_helper"
require "ostruct"

NOTIFICATION_TYPES = {
  comment_to_commenters: "NewCommentToOtherCommentersNotifier::Notification",
  comment_to_author: "NewCommentToAuthorNotifier::Notification",
  rating: "NewRatingNotifier::Notification",
  achievement: "AchievementUnlockedNotifier::Notification"
}.freeze

class Notifications::Presenters::BaseTest < ActiveSupport::TestCase
  setup do
    @user = users(:no_relationship_user)
    @recipe = recipes(:no_relationship_recipe)
    @comment = Recipes::Models::Comment.create!(user: @user, commentable: @recipe, content: "Test comment")
    @rating = Recipes::Models::Rating.create!(user: @user, recipe: @recipe, value: 4.5)
    @user_achievement = Users::Models::UserAchievement.create!(
      user: @user,
      key: "first_recipe",
      unlocked_at: Time.current
    )
  end

  test "to_h should return correct hash structure" do
    notification = create_mock_notification(:comment_to_author, @comment)
    presenter = Notifications::Presenters::Base.new(notification)
    result = presenter.to_h

    assert_instance_of Hash, result
    assert_includes result.keys, :id
    assert_includes result.keys, :event
    assert_includes result.keys, :message
    assert_includes result.keys, :linked_item_path
    assert_includes result.keys, :read_at
    assert_includes result.keys, :seen_at
    assert_includes result.keys, :created_at
  end

  test "message for comment notifications" do
    notification = create_mock_notification(:comment_to_author, @comment)
    presenter = Notifications::Presenters::Base.new(notification)

    expected_message = "Nouveau commentaire sur la recette '#{@recipe.name}'"
    assert_equal expected_message, presenter.send(:message)
  end

  test "message for rating notifications" do
    notification = create_mock_notification(:rating, @rating)
    presenter = Notifications::Presenters::Base.new(notification)

    expected_message = "Nouvelle note sur la recette '#{@recipe.name}'"
    assert_equal expected_message, presenter.send(:message)
  end

  test "message for achievement notifications" do
    notification = create_mock_notification(:achievement, @user_achievement)
    presenter = Notifications::Presenters::Base.new(notification)

    achievement_rule = AchievementRules.rules.find { |rule| rule.key.to_s == @user_achievement.key }
    expected_message = "Succès '#{achievement_rule.name}' débloqué"
    assert_equal expected_message, presenter.send(:message)
  end

  test "linked_item_path for comment notifications" do
    notification = create_mock_notification(:comment_to_author, @comment)
    presenter = Notifications::Presenters::Base.new(notification)

    expected_path = "/recipes/#{@recipe.id}"
    assert_equal expected_path, presenter.send(:linked_item_path)
  end

  test "linked_item_path for achievement notifications" do
    notification = create_mock_notification(:achievement, @user_achievement)
    presenter = Notifications::Presenters::Base.new(notification)

    expected_path = "/my_profile"
    assert_equal expected_path, presenter.send(:linked_item_path)
  end

  test "extract_event returns correct event type for comment to author" do
    notification = create_mock_notification(:comment_to_author, @comment)
    presenter = Notifications::Presenters::Base.new(notification)

    assert_equal "new_comment", presenter.send(:extract_event)
  end

  private

  def create_mock_notification(type, record)
    OpenStruct.new(
      id: 1,
      type: NOTIFICATION_TYPES[type],
      record: record, # shortcut to :record method on Noticed::Notification
      read_at: nil,
      seen_at: nil,
      recipient_type: "User",
      recipient_id: 1,
      created_at: Time.current,
      updated_at: Time.current
    )
  end
end
