class Recipes::Queries::Index < QueryBase
  def initialize(params)
    @params = params
  end

  def call
    Recipes::Models::Recipe
      .filter(@params.slice(:name, :user_id, :tags_ids))
      .includes(:tags, user: [:avatar_attachment])
      .order(created_at: :desc)
  end
end
