class TagsController < ApplicationController
  include Paginatable

  inertia_share flash: -> { flash.to_hash }

  # GET /tags
  def index
    @tags = Tag.filter(params.slice(:name)).order(recipes_count: :asc)
    @pagy, @tags = paginate_collection(@tags)

    render json: {tags: @tags.as_json, pagy: @pagy.data_hash}
  end

  # GET /tags/by_ids
  def by_ids
    ids = params[:ids]&.split(",")&.map(&:to_i) || []
    @tags = Tag.where(id: ids)

    render json: {tags: @tags.as_json}
  end

  # POST /tags
  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render json: @tag.as_json, status: :created
    else
      render json: {errors: @tag.errors}, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def tag_params
    params.expect(tag: [:name])
  end
end
