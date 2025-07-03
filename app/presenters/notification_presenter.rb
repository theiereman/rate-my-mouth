class NotificationPresenter # used to present Noticed::Notification objects
  TYPE_MAPPING = {
    "NewCommentNotifier::Notification" => "new_comment",
    "NewRatingNotifier::Notification" => "new_rating",
    "AchievementUnlockedNotifier::Notification" => "achievement_unlocked"
  }.freeze

  def initialize(notification)
    @notification = notification
  end

  def to_h
    {
      id: @notification.id,
      event: extract_event,
      recipe: recipe,
      read_at: @notification.read_at,
      seen_at: @notification.seen_at,
      created_at: @notification.created_at
    }
  end

  def recipe
    @notification.record.recipe.as_json(only: [ :id, :name ]) if @notification.record.respond_to?(:recipe)
  end

  private

  def extract_event
    TYPE_MAPPING[@notification.type] || "unknown"
  end
end
