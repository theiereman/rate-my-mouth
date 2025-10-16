class ApplicationController < ActionController::Base
  include Pagy::Backend

  rescue_from StandardError, with: :inertia_error_page

  before_action :authenticate_user!, unless: :health_check_request?
  before_action :configure_permitted_parameters, if: :devise_controller?

  inertia_share flash: -> { flash.to_hash }
  inertia_share if: :user_signed_in? do
    {
      csrf_token: form_authenticity_token,
      current_user: current_user.as_json(only: [:username, :email])
    }
  end

  protected

  def inertia_error_page(exception)
    raise exception if Rails.env.local?
    status = ActionDispatch::ExceptionWrapper.new(nil, exception).status_code
    render inertia: "ErrorPage", props: {status:}, status:
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end

  def health_check_request?
    request.path == "/up"
  end
end
