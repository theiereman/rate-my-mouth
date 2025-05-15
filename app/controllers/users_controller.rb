class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update ]

  # GET /users/list.json
  def list
    @users = User.all.order(:username)
    render json: @users.as_json(only: [ :id, :username, :email ])
  end

  def show
    render inertia: "User/Show", props: {
      user: user_as_json
    }
  end

  def update
    if @user.update(user_params)
      redirect_to user_path(@user), notice: "Utilisateur mis à jour avec succès"
    else
      redirect_to user_path(@user), alert: "Erreur lors de la mise à jour de l'utilisateur"
    end
  end

  def my_profile
    render inertia: "User/Show", props: {
      user: user_as_json(current_user)
    }
  end

  private
    def user_params
      params.expect(user: [ :notification_preference ])
    end

    def set_user_by_username
      @user = User.find_by(username: params[:username])
      redirect_to root_path, alert: "Utilisateur introuvable" if @user.nil?
    end

    def set_user
      @user = User.find(params[:id])
      redirect_to root_path, alert: "Utilisateur introuvable" if @user.nil?
    end

    def user_as_json(user = @user)
      user.as_json(only: [ :id, :username, :notification_preference, :created_at ], methods: [ :number_of_recipes, :number_of_comments, :number_of_ratings ])
    end
end
