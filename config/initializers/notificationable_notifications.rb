ActiveSupport::Notifications.subscribe(/\.created.notificationable$|\.updated.notificationable$/) do |*args|
  event   = ActiveSupport::Notifications::Event.new(*args)
  user    = event.payload[:user]
  record  = event.payload[:record]
  next unless user.is_a?(User) && record

  # Méthode helper pour vérifier les conditions de notification
  def should_notify?(record, action_user)
    return false unless record.respond_to?(:recipe)

    recipe_owner = record.recipe.user

    return false if recipe_owner.id == action_user.id

    # Ne pas notifier si les notifications sont désactivées
    return false unless recipe_owner.notification_preference?

    true
  end

  case event.name
  when /^comment/
    if record.commentable&.is_a?(Recipe) && should_notify?(record, record.user)
      NewCommentNotifier.with(record: record).deliver
    end
  when /^rating/
    if should_notify?(record, record.user)
      NewRatingNotifier.with(record: record).deliver
    end
  end
end
