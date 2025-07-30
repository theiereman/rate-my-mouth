class Recipes::QueryIndex
  def initialize(params)
    @params = params
  end

  def call
    Recipe
      .filter(@params.slice(:name, :user_id, :tags_ids))
      .includes(:thumbnail_attachment, :tags, :ingredients, :instructions, user: [:avatar_attachment])
      .order(created_at: :desc)
  end
end
