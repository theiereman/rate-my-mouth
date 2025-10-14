class ApplicationNotifier < Noticed::Event
  def self.deliver_by(method, &block)
    if method == :email
      super do |config|
        config.if = -> { !recipient.respond_to?(:notification_preference?) || recipient.notification_preference? }
        block&.call(config)
      end
    else
      super
    end
  end
end
