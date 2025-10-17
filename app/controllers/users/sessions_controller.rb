class Users::SessionsController < Devise::SessionsController
  before_action :redirect_if_authenticated, only: [:new, :create]

  # GET /auth/sign_in
  def new
    render inertia: "Public/Login"
  end

  private

  def redirect_if_authenticated
    if user_signed_in?
      redirect_to root_path
    end
  end
end
