class Recipes::Presenters::Index < Recipes::Presenters::Base
  def initialize(recipe)
    super
  end

  def as_json
    @recipe.as_json(
      include: {
        user: {
          only: [:id, :username]
        },
        tags: {}
      }
    ).merge({
      average_rating: average_rating
    })
  end
end
