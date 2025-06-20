require "test_helper"

class BaseControllerTest < ActionDispatch::IntegrationTest
  include Devise::Test::IntegrationHelpers
  def setup
    super
    @user = users(:one)
    @other_user = users(:two)
    sign_in @user
  end
end
