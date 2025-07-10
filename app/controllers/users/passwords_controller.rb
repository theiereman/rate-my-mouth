class Users::PasswordsController < Devise::PasswordsController
  # GET /users/password/new
  def new
    # Utiliser Inertia pour rendre la page de récupération de mot de passe React
    render inertia: "Auth/ForgotPassword"
  end

  # POST /users/password
  def create
    self.resource = resource_class.send_reset_password_instructions(resource_params)
    yield resource if block_given?

    if successfully_sent?(resource)
      flash[:notice] = "Vous allez recevoir un e-mail avec les instructions de réinitialisation de votre mot de passe dans quelques minutes."
    else
      flash[:alert] = resource.errors.full_messages.join(", ")
    end

    render inertia: "Auth/ForgotPassword"
  end

  # GET /users/password/edit?reset_password_token=abcdef
  def edit
    # Cette page utilise le template ERB car elle vient d'un lien email
    # et doit afficher le formulaire de réinitialisation avec le token
    super
  end

  # PUT /users/password
  def update
    # Cette méthode peut garder le comportement par défaut de Devise
    super
  end

  protected

  def after_resetting_password_path_for(resource)
    # Rediriger vers la page de connexion après la réinitialisation
    new_user_session_path
  end

  def after_sending_reset_password_instructions_path_for(resource_name)
    # Rediriger vers la page de connexion après l'envoi des instructions
    new_user_session_path
  end
end
