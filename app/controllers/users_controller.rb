class UsersController < ApplicationController
  include Paginatable

  before_action :set_user, only: %i[ show update update_avatar ]

  def index
    @users = User.all.order(:username)
    render json: @users.as_json(only: [ :id, :username, :email ])
  end

  def show
    if @user == current_user
      redirect_to my_profile_path
      return
    end

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

  def update_avatar
    @user.avatar.purge if @user.avatar.attached?
    @user.avatar.attach(user_params[:avatar])

    redirect_to user_path(@user), notice: "Avatar mis à jour avec succès"
  end

  def my_profile
    render inertia: "User/Show", props: {
      user: user_as_json(current_user)
    }
  end

  private
    def user_params
      params.expect(user: [ :notification_preference, :avatar ])
    end

    def set_user
      @user = User.find(params[:id])
      redirect_to root_path, alert: "Utilisateur introuvable" if @user.nil?
    end

    def user_as_json(user = @user)
      user
      .as_json(
        only: [ :id, :username, :title, :notification_preference, :created_at, :recipes_count, :comments_count, :ratings_count ],
        methods: [ :avatar_url ]
      )
    end
end
