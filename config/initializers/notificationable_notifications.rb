ActiveSupport::Notifications.subscribe(/\.created.notificationable$|\.updated.notificationable$/) do |*args|
  event   = ActiveSupport::Notifications::Event.new(*args)
  user    = event.payload[:user]
  record  = event.payload[:record]
  next unless user.is_a?(User) && record

  case event.name.starts_with?
  when "comment" && record.commentable.is_a?(Recipe)
    NewCommentNotifier.with(record: record).deliver
  when "rating"
    NewRatingNotifier.with(record: record).deliver
  end
end
