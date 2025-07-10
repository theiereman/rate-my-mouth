module Notificationable
  extend ActiveSupport::Concern

  included do
    after_create { instrument_notification(:created) }
  end

  private

  def instrument_notification(action)
    event_name = "#{self.class.name.underscore}.#{action}.notificationable"
    ActiveSupport::Notifications.instrument(event_name, user: respond_to?(:user) ? user : nil, record: self)
  end
end
