require "test_helper"

class NoteTest < ActiveSupport::TestCase
  def setup
    @note = notes(:one)
    @user = users(:one)
  end

  # Tests de validations de base
  test "should be valid with valid attributes" do
    assert @note.valid?
  end

  test "should require user" do
    @note.user = nil
    assert_not @note.valid?
  end

  test "should require recipe" do
    @note.recipe = nil
    assert_not @note.valid?
  end

  test "should not allow user to create multiple notes for same recipe" do
    dup_note = @note.dup
    assert_not dup_note.valid?
  end
end
