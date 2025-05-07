class Users::SessionsController < Devise::SessionsController
  # GET /users/sign_in
  def new
    # Utiliser Inertia pour rendre la page de connexion React
    render inertia: "Auth/Login"
  end

  # POST /users/sign_in
  def create
    self.resource = warden.authenticate(auth_options)

    if resource
      set_flash_message!(:notice, :signed_in)
      sign_in(resource_name, resource)
      yield resource if block_given?
      redirect_to root_path
    else
      flash[:alert] = "Email ou mot de passe invalide"
      render inertia: "Auth/Login"
    end
  end

  # DELETE /users/sign_out
  def destroy
    sign_out
    inertia_location new_user_session_path
  end
end
