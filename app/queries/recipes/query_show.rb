class Recipes::QueryShow
  def initialize(params)
    @params = params
  end

  def call
    Recipe
      .includes(:thumbnail_attachment, :user, :tags, :ingredients, :instructions)
      .find(@params[:id])
  end
end
