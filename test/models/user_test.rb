require "test_helper"

class UserTest < ActiveSupport::TestCase
  setup do
    @user = users(:one)
  end

  test "should be valid" do
    assert @user.valid?
  end

  test "should require email" do
    @user.email = nil
    assert_not @user.valid?
    assert_includes @user.errors[:email], "can't be blank"
  end

  test "should require unique email" do
    duplicate_user = @user.dup
    duplicate_user.email = @user.email.upcase
    @user.save
    assert_not duplicate_user.valid?
  end

  test "should require username" do
    @user.username = nil
    assert_not @user.valid?
  end

  test "should have a 6 caracters minimum password" do
    @user.password = "short"
    @user.password_confirmation = "short"
    assert_not @user.valid?
  end

  test "should reject invalid email format" do
    invalid_emails = %w[user@example,com user_at_foo.org user.name@example. foo@bar_baz.com foo@bar+baz.com]
    invalid_emails.each do |email|
      @user.email = email
      assert_not @user.valid?, "#{email.inspect} should be invalid"
    end
  end

  test "should save email as lowercase" do
    mixed_case_email = "Foo@ExAmPlE.CoM"
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test "should have one recipe" do
    assert_equal 1, @user.number_of_recipes
  end

  test "should make one request to count recipes" do
    assert_queries_count(1) do
      @user.number_of_recipes
    end
  end

  test "should make one request to count comments" do
    assert_queries_count(1) do
      @user.number_of_comments
    end
  end

  test "should make one request to count ratings" do
    assert_queries_count(1) do
      @user.number_of_ratings
    end
  end
end
