class NotificationPresenter # used to present Noticed::Notification objects
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

  def initialize(notification)
    @notification = notification
  end

  def to_h
    {
      id: @notification.id,
      type: extract_type,
      event: "created",
      message: generate_message,
      read_at: @notification.read_at,
      seen_at: @notification.seen_at,
      created_at: @notification.created_at
    }
  end

  def type
    extract_type
  end

  def message
    generate_message
  end

  def read?
    @notification.read_at.present?
  end

  def seen?
    @notification.seen_at.present?
  end

  private

  def extract_type
    TYPE_MAPPING[@notification.type] || "unknown"
  end

  def generate_message
    MESSAGE_MAPPING[extract_type] || "Nouvelle notification"
  end
end
