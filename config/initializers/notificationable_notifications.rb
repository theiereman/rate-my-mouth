ActiveSupport::Notifications.subscribe(/\.created.notificationable$|\.updated.notificationable$/) do |*args|
  event   = ActiveSupport::Notifications::Event.new(*args)
  user    = event.payload[:user]
  record  = event.payload[:record]
  next unless user.is_a?(User) && record

  p "event notification for mailing:"
  p event.name

  if event.name.starts_with?("comment")
    if record.commentable.is_a?(Recipe) && record.commentable.user != user
      NotificationMailer.with(comment: record).new_comment_notification.deliver_later
    end
  elsif event.name.starts_with?("rating")
    if record.recipe.user != user
      NotificationMailer.with(rating: record).new_rating_notification.deliver_later
    end
  end
end
