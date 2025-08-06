require "test_helper"

class Shared::Concerns::PaginatableRepositoryTest < ActiveSupport::TestCase
  class TestRepository
    include Shared::Concerns::PaginatableRepository

    def test_pagination
      # Mock d'une collection ActiveRecord
      collection = Recipe.all

      pagination_params = {page: 2, limit: 10}
      pagy, _records = paginate_collection(collection, pagination_params: pagination_params)

      assert_not_nil pagy
      assert_not_nil _records
      assert_equal 2, pagy.page
      assert_equal 10, pagy.limit
    end

    def test_pagination_defaults
      collection = Recipe.all

      pagination_params = {}
      pagy, _records = paginate_collection(collection, pagination_params: pagination_params)

      assert_equal 1, pagy.page
      assert_equal 20, pagy.limit # default_pagination_limit
    end

    def test_pagination_limit_constraints
      collection = Recipe.all

      pagination_params = {limit: 100} # Plus que la limite max
      pagy, _records = paginate_collection(collection, pagination_params: pagination_params)

      assert_equal 50, pagy.limit # max_pagination_limit
    end
  end

  setup do
    @repository = TestRepository.new
  end

  test "should include Pagy::Backend" do
    assert @repository.class.included_modules.include?(Pagy::Backend)
  end

  test "should have pagination methods" do
    assert_respond_to @repository, :paginate_collection
    assert_respond_to @repository, :extract_page_param
    assert_respond_to @repository, :extract_limit_param
    assert_respond_to @repository, :default_pagination_limit
    assert_respond_to @repository, :max_pagination_limit
  end

  test "extract_page_param should handle various inputs" do
    assert_equal 1, @repository.send(:extract_page_param, {})
    assert_equal 1, @repository.send(:extract_page_param, {page: nil})
    assert_equal 1, @repository.send(:extract_page_param, {page: 0})
    assert_equal 1, @repository.send(:extract_page_param, {page: -1})
    assert_equal 5, @repository.send(:extract_page_param, {page: 5})
    assert_equal 5, @repository.send(:extract_page_param, {page: "5"})
  end

  test "extract_limit_param should handle various inputs" do
    assert_equal 20, @repository.send(:extract_limit_param, {})
    assert_equal 20, @repository.send(:extract_limit_param, {limit: nil})
    assert_equal 20, @repository.send(:extract_limit_param, {limit: 0})
    assert_equal 20, @repository.send(:extract_limit_param, {limit: -1})
    assert_equal 10, @repository.send(:extract_limit_param, {limit: 10})
    assert_equal 50, @repository.send(:extract_limit_param, {limit: 100}) # limited to max
    assert_equal 10, @repository.send(:extract_limit_param, {limit: "10"})
  end

  test "should have correct default values" do
    assert_equal 20, @repository.send(:default_pagination_limit)
    assert_equal 50, @repository.send(:max_pagination_limit)
  end
end
