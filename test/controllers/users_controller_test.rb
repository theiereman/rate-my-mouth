require "test_helper"

class UsersControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers

  setup do
    @user = users(:one)
    @other_user = users(:two)
  end

  test "should get index" do
    sign_in @user
    get users_path
    assert_response :success
  end

  test "should get sign_up" do
    get new_user_registration_path
    assert_response :success
  end

  test "should get sign_in" do
    get new_user_session_path
    assert_response :success
  end

  test "should sign up user" do
    assert_difference("User.count") do
      post user_registration_path, params: {user: {username: "new_user_name", email: "new_user@example.com", password: "password", password_confirmation: "password"}}
    end

    assert_redirected_to root_path
  end

  test "should not sign up user with already taken email" do
    assert_no_difference("User.count") do
      post user_registration_path, params: {user: {username: "new_user_name", email: @user.email, password: "password", password_confirmation: "password"}}
    end

    assert_equal "Email has already been taken", flash[:alert]
  end

  test "should not sign up user with already taken username" do
    assert_no_difference("User.count") do
      post user_registration_path, params: {user: {username: @user.username, email: "new_user@example.com", password: "password", password_confirmation: "password"}}
    end

    assert_equal "Username has already been taken", flash[:alert]
  end

  test "should show my_profile page when visiting own profile" do
    sign_in @user
    get user_path(@user)
    assert_redirected_to my_profile_path
  end

  test "should show user profile" do
    sign_in @user
    get user_path(@other_user)
    assert_response :success
    assert_includes @response.body, @other_user.username
  end

  test "should sign in user" do
    post user_registration_path, params: {user: {username: "new_user_name", email: "new_user@example.com", password: "password", password_confirmation: "password"}}
    post user_session_path, params: {user: {email: "new_user@example.com", password: "password"}}
    assert_response :redirect
    assert_redirected_to root_path
  end
end
