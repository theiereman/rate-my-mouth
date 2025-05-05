module Achievable
  extend ActiveSupport::Concern

  included do
    after_create  { instrument_achievement(:created) }
    after_update  { instrument_achievement(:updated) }
  end

  private

  def instrument_achievement(action)
    event_name = "#{self.class.name.underscore}.#{action}"
    ActiveSupport::Notifications.instrument(event_name, user: self.respond_to?(:user) ? self.user : nil, record: self)
  end
end
