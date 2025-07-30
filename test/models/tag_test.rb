require "test_helper"

class TagTest < ActiveSupport::TestCase
  setup do
    @tag = tags(:one)
    @tag2 = tags(:two)
  end

  test "should be valid" do
    assert @tag.valid?
  end

  test "should require name" do
    @tag.name = nil
    assert_not @tag.valid?
    assert_includes @tag.errors[:name], "can't be blank"
  end

  test "should have a name between 2 and 20 characters" do
    @tag.name = ""
    assert_not @tag.valid?
    assert_includes @tag.errors[:name], "is too short (minimum is 2 characters)"
    @tag.name = "a" * 21
    assert_not @tag.valid?
    assert_includes @tag.errors[:name], "is too long (maximum is 20 characters)"
  end

  test "should be unique" do
    duplicate_tag = @tag.dup
    duplicate_tag.name = @tag.name.upcase
    @tag.save
    assert_not duplicate_tag.valid?
  end

  test "should find or initialize by name" do
    tag_name = "UniqueTag"
    tag = Recipes::Models::Tag.find_or_initialize_by_name(tag_name)
    assert tag.new_record?
    assert_equal tag_name, tag.name

    found_tag = Recipes::Models::Tag.find_or_initialize_by_name(@tag.name)
    assert_not found_tag.new_record?
    assert_equal @tag.id, found_tag.id
  end

  test "should not allow duplicate tags with different case" do
    duplicate_tag = Recipes::Models::Tag.new(name: @tag.name.upcase)
    assert_not duplicate_tag.valid?
  end
end
