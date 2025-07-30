class TagsController < ApplicationController
  include Paginatable

  def index
    @tags = Tags::Queries::Index.call(params)
    @pagy, @tags = paginate_collection(@tags)
    render json: {tags: @tags.as_json, pagy: pagy_metadata(@pagy)}
  end

  def by_ids
    @tags = Tags::Queries::ByIds.call(params)
    render json: {tags: @tags.as_json}
  end
end
