class Users::PasswordsController < Devise::PasswordsController
  def new
    render inertia: "Public/ForgotPassword"
  end

  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      flash[:notice] = "Vous allez recevoir un e-mail avec les instructions de réinitialisation de votre mot de passe dans quelques minutes."
    else
      flash[:alert] = resource.errors.full_messages.join(", ")
    end

    render inertia: "Public/ForgotPassword"
  end

  protected

  def after_resetting_password_path_for(resource)
    new_user_session_path
  end

  def after_sending_reset_password_instructions_path_for(resource_name)
    new_user_session_path
  end
end
