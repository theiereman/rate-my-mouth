require "test_helper"

class RatingTest < ActiveSupport::TestCase
  def setup
    @rating = ratings(:one)
  end

  test "should be valid with valid attributes" do
    assert @rating.valid?
  end

  test "should require user" do
    @rating.user = nil
    assert_not @rating.valid?
  end

  test "should require recipe" do
    @rating.recipe = nil
    assert_not @rating.valid?
  end

  test "should require value" do
    @rating.value = nil
    assert_not @rating.valid?
    assert_includes @rating.errors[:value], "can't be blank"
  end

  test "should require float value" do
    @rating.value = 1
    assert @rating.valid?

    @rating.value = 1.0
    assert @rating.valid?
  end

  test "should require value between 0 and 5" do
    @rating.value = -1
    assert_not @rating.valid?

    @rating.value = 6
    assert_not @rating.valid?
  end

  test "should not allow user to rate same recipe twice" do
    dup_rating = @rating.dup
    assert_not dup_rating.valid?
  end
end
