class Cooking::Services::Tags::SearchTags
  def self.call(tags_repo, query)
    new(tags_repo, query).call
  end

  attr_reader :tags_repo, :query

  def initialize(tags_repo, query)
    @tags_repo = tags_repo
    @query = query
  end

  def call
    return tags_repo.popular if query.nil? || query.strip.empty?
    tags_repo.search(query)
  end
end
