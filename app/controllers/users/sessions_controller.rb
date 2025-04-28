class Users::SessionsController < Devise::SessionsController
  def destroy
    sign_out
    inertia_location root_path
  end
end
