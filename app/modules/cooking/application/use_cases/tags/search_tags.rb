class Cooking::Application::UseCases::Tags::SearchTags < Shared::Application::UseCases::UseCaseBase
  def initialize(tags_repo, query)
    @tags_repo = tags_repo
    @query = query
  end

  def call
    return tags_repo.popular if query.nil? || query.strip.empty?
    tags_repo.search_with_recipes_count(query)
  end

  private

  attr_reader :tags_repo, :query
end
