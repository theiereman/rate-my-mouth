module Shared::Application::Results
  class PaginatedResult
    attr_reader :data, :pagy

    def initialize(data:, pagy:)
      @data = data
      @pagy = pagy
    end
  end
end
