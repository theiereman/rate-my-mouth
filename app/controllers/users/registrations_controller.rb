class Users::RegistrationsController < Devise::RegistrationsController
  before_action :configure_sign_up_params, only: [:create]

  # GET /users/sign_up
  def new
    # Utiliser Inertia pour rendre la page d'inscription React
    render inertia: "Public/Register"
  end

  # POST /users
  def create
    build_resource(sign_up_params)

    resource.save
    yield resource if block_given?

    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
      end

      redirect_to root_path
    else
      clean_up_passwords resource
      set_minimum_password_length
      flash[:alert] = resource.errors.full_messages.join(", ")
      render inertia: "Public/Register", status: :unprocessable_entity
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username])
  end

  def respond_with(resource, _opts = {})
    if resource.persisted?
      inertia_location after_sign_up_path_for(resource)
    else
      redirect_to new_user_registration_path, inertia: {errors: resource.errors}
    end
  end
end
