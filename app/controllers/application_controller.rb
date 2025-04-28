class ApplicationController < ActionController::Base
  allow_browser versions: :modern
  inertia_share flash: -> { flash.to_hash }
  before_action :authenticate_user!
  before_action :configure_permitted_parameters, if: :devise_controller?

  inertia_share do
    {
      user: current_user
    } if user_signed_in?
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :username ])
  end
end
