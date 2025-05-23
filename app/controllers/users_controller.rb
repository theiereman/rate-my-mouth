class UsersController < ApplicationController
  before_action :set_user, only: %i[ show update update_avatar ]

  # GET /users/list.json
  def list
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

  def select_achievement_as_title
    @user = User.find(params[:id])

    achievement_key = params[:key]
    user_achievement_keys = @user.user_achievements.pluck(:key)

    unless user_achievement_keys.include?(achievement_key)
      redirect_to user_path(@user), alert: "Vous ne pouvez pas sélectionner ce titre car vous n'avez pas débloqué le succès associé."
      return
    end

    achievement_rule = AchievementRules.rules.find { |rule| rule.key.to_s == achievement_key }

    if achievement_rule
      # storing the value that way could be problematic the day we change the name of the achievements
      # -> should not happen though
      @user.title = achievement_rule.name

      if @user.save
        redirect_to user_path(@user), notice: "Titre mis à jour avec succès"
      else
        redirect_to user_path(@user), alert: "Erreur lors de la mise à jour du titre"
      end
    else
      redirect_to user_path(@user), alert: "Succès introuvable"
    end
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
        only: [ :id, :username, :title, :notification_preference, :created_at ],
        methods: [ :number_of_recipes, :number_of_comments, :number_of_ratings, :avatar_url ]
      )
    end
end
