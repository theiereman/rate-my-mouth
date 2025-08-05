class Cooking::Interfaces::Controllers::TagsController < ApplicationController
  include Paginatable

  def index
    # TODO : use presenter and fix pagination
    tags_repo = Cooking::Infrastructure::Repositories::ActiveRecordTagRepository.new
    result = Cooking::Services::Tags::SearchTags.call(tags_repo, params[:name])
    @pagy, result = paginate_array(result)
    render json: result.map { |result|
      {
        id: result[:tag].id,
        name: result[:tag].name,
        recipes_count: result[:count]
      }
    }
  end

  def by_ids
    @tags = Tags::Queries::ByIds.call(params)
    render json: {tags: @tags.as_json}
  end
end
