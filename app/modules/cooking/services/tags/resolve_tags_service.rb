class Cooking::Services::Tags::ResolveTagsService
  def initialize(tag_repository: Cooking::Domain::Repositories::TagRepository.new)
    @tag_repository = tag_repository
  end

  def call(tags)
    return [] if tags.blank?

    tags.map do |tag|
      @tag_repository.find_or_create_by_name(tag)
    end
  end
end
