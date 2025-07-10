require "test_helper"
require_relative "base_controller_test"

class TagsControllerTest < BaseControllerTest
  setup do
    @tag = tags(:one)
  end

  test "should get index" do
    get tags_url
    assert_response :success
  end

  test "should create tag" do
    assert_difference("Tag.count") do
      post tags_url, params: {tag: {name: "brand new tag !"}}
    end
  end
end
