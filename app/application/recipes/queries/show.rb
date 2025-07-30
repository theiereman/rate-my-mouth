class Recipes::Queries::Show < QueryBase
  def initialize(params)
    @params = params
  end

  def call
    Recipes::Models::Recipe
      .includes(:thumbnail_attachment, :user, :tags, :ingredients, :instructions)
      .find(@params[:id])
  end
end
