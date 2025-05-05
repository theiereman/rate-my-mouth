ActiveSupport::Notifications.subscribe(/\.created$|\.updated$/) do |*args|
  event   = ActiveSupport::Notifications::Event.new(*args)
  user    = event.payload[:user]
  record  = event.payload[:record]
  next unless user.is_a?(User) && record

  AchievementUnlocker.new(user).check!(event.name, record: record)
end
