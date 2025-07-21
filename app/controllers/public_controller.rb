class PublicController < ApplicationController
  skip_before_action :authenticate_user!

  def index
    if user_signed_in?
      redirect_to recipes_path
      return
    end

    render inertia: "Public/Home"
  end
end
