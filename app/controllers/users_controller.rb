class UsersController < ApplicationController
  before_action :set_user, only: %i[ show ]

  # GET /users
  def index
    @users = User.all
    render inertia: "User/Index", props: {
      users: @users.as_json(only: [ :id, :username ])
    }
  end

  # GET /users/list.json
  def list
    @users = User.all.order(:username)
    render json: @users.as_json(only: [ :id, :username, :email ])
  end

  # GET /users/1
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
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def user_params
      params.require(:user).permit(:username)
    end

    def user_as_json(user = @user)
      user.as_json(only: [ :id, :username, :created_at ], methods: [ :number_of_recipes, :number_of_comments, :number_of_ratings ])
    end
end
