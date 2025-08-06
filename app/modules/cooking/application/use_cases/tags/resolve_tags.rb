class Cooking::Application::UseCases::Tags::ResolveTags < Shared::Application::UseCaseBase
  def initialize(tag_repository, tags)
    @tag_repository = tag_repository
    @tags = tags
  end

  def call
    return [] if tags.blank?

    tags.map do |tag|
      tag_repository.find_or_create_by_name(tag)
    end
  end

  private

  attr_reader :tag_repository, :tags
end
