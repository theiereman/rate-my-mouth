class UsersController < ApplicationController
  before_action :set_user, only: %i[ show edit update destroy ]

  inertia_share flash: -> { flash.to_hash }

  # GET /users
  def index
    @users = User.all
    render inertia: "User/Index", props: {
      users: @users.map do |user|
        serialize_user(user)
      end
    }
  end

  # GET /users/1
  def show
    render inertia: "User/Show", props: {
      user: serialize_user(@user)
    }
  end

  # GET /users/new
  def new
    @user = User.new
    render inertia: "User/New", props: {
      user: serialize_user(@user)
    }
  end

  # GET /users/1/edit
  def edit
    render inertia: "User/Edit", props: {
      user: serialize_user(@user)
    }
  end

  # POST /users
  def create
    @user = User.new(user_params)

    if @user.save
      redirect_to @user, notice: "User was successfully created."
    else
      redirect_to new_user_url, inertia: { errors: @user.errors }
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      redirect_to @user, notice: "User was successfully updated."
    else
      redirect_to edit_user_url(@user), inertia: { errors: @user.errors }
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy!
    redirect_to users_url, notice: "User was successfully destroyed."
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

    def serialize_user(user)
      user.as_json(only: [
        :id, :username
      ])
    end
end
