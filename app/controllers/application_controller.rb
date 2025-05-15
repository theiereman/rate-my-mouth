class ApplicationController < ActionController::Base
  include Pagy::Backend

  inertia_share flash: -> { flash.to_hash }
  before_action :authenticate_user!, unless: :health_check_request?
  before_action :configure_permitted_parameters, if: :devise_controller?

  inertia_share if: :user_signed_in? do
    {
      current_user: current_user
    }
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :username ])
  end

  def health_check_request?
    request.path == "/up"
  end
end
