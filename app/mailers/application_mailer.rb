class ApplicationMailer < ActionMailer::Base
  default from: email_address_with_name("contact@dotsncircles.com", "Rate My Mouth")
  layout "mailer"
end
