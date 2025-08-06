class Cooking::Interfaces::Controllers::TagsController < ApplicationController
  include Paginatable

  def index
    tags_repo = Cooking::Infrastructure::Repositories::ActiveRecordTagRepository.new
    tags_with_recipes_count = Cooking::Application::UseCases::Tags::SearchTags.call(tags_repo, params[:name])
    render json: tags_with_recipes_count
  end

  def by_ids
    @tags = Tags::Queries::ByIds.call(params)
    render json: {tags: @tags.as_json}
  end
end
