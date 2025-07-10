class TagsController < ApplicationController
  inertia_share flash: -> { flash.to_hash }

  # GET /tags
  def index
    @tags = Tag.all.sort { |a, b| b.recipes_count <=> a.recipes_count }

    render json: @tags.map { |tag| serialize_tag(tag) }
  end

  # POST /tags
  def create
    @tag = Tag.new(tag_params)

    if @tag.save
      render json: serialize_tag(@tag), status: :created
    else
      render json: {errors: @tag.errors}, status: :unprocessable_entity
    end
  end

  private

  # Only allow a list of trusted parameters through.
  def tag_params
    params.expect(tag: [:name])
  end

  def serialize_tag(tag)
    tag.as_json
  end
end
