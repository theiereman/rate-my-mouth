class NotificationFormatterService
  def initialize(notifications)
    @notifications = notifications
  end

  def format
    @notifications.map { |notification| format_notification(notification) }
  end

  private

  def format_notification(notification)
    {
      id: notification.id,
      type: extract_type(notification),
      event: "created",
      message: generate_message(notification),
      read_at: notification.read_at,
      seen_at: notification.seen_at,
      created_at: notification.created_at
    }
  end

  def extract_type(notification)
    TYPE_MAPPING[notification.type] || "unknown"
  end

  def generate_message(notification)
    MESSAGE_MAPPING[extract_type(notification)] || "Nouvelle notification"
  end

  TYPE_MAPPING = {
    "NewCommentNotifier::Notification" => "comment",
    "NewRatingNotifier::Notification" => "rating",
    "AchievementUnlockedNotifier::Notification" => "achievement"
  }.freeze

  MESSAGE_MAPPING = {
    "comment" => "Nouveau commentaire sur votre contenu",
    "rating" => "Nouvelle note reçue",
    "achievement" => "Nouveau succès débloqué"
  }.freeze
end
