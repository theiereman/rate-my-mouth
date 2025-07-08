class NotificationPresenter # used to present Noticed::Notification objects
  include Rails.application.routes.url_helpers

  TYPE_MAPPING = {
    "NewCommentToOtherCommentersNotifier::Notification" => "new_comment",
    "NewCommentToAuthorNotifier::Notification" => "new_comment",
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
      message: message,
      linked_item_path: linked_item_path,
      read_at: @notification.read_at,
      seen_at: @notification.seen_at,
      created_at: @notification.created_at
    }
  end

  private

  def message
    case @notification.type
    when "NewCommentToOtherCommentersNotifier::Notification", "NewCommentToAuthorNotifier::Notification"
      "Nouveau commentaire sur la recette '#{@notification.record.recipe.name}'" if @notification.record&.recipe
    when "NewRatingNotifier::Notification"
      "Nouvelle note sur la recette '#{@notification.record.recipe.name}'" if @notification.record&.recipe
    when "AchievementUnlockedNotifier::Notification"
      achievement = AchievementRules.rules.find { |rule| rule.key.to_s == @notification.record&.key }
      achievement ? "Succès '#{achievement.name}' débloqué" : "Succès débloqué"
    else
      "Vous avez une nouvelle notification"
    end
  end

  def linked_item_path
    case @notification.type
    when "NewCommentToOtherCommentersNotifier::Notification", "NewCommentToAuthorNotifier::Notification", "NewRatingNotifier::Notification"
      recipe_path(@notification.record.recipe) if @notification.record&.respond_to?(:recipe)
    when "AchievementUnlockedNotifier::Notification"
      my_profile_path
    else
      nil
    end
  end

  def extract_event
    TYPE_MAPPING[@notification.type] || "unknown"
  end
end
