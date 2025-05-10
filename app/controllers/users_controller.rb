class UsersController < ApplicationController
  before_action :set_user, only: %i[ show ]

  # GET /users/list.json
  def list
    @users = User.all.order(:username)
    render json: @users.as_json(only: [ :id, :username, :email ])
  end

  # GET /users/:username
  def show
    render inertia: "User/Show", props: {
      user: user_as_json
    }
  end

  def my_profile
    render inertia: "User/Show", props: {
      user: user_as_json(current_user)
    }
  end

  private
    def set_user
      @user = User.find_by(username: params[:username])
      redirect_to root_path, alert: "Utilisateur introuvable" if @user.nil?
    end

    def user_as_json(user = @user)
      user.as_json(only: [ :id, :username, :created_at ], methods: [ :number_of_recipes, :number_of_comments, :number_of_ratings ])
    end
end
