class Recipes::Presenters::Show < Recipes::Presenters::Base
  def initialize(recipe, user = nil)
    @user = user
    super(recipe)
  end

  def as_json
    res = @recipe.as_json(
      include: {
        user: {
          only: [:id, :username]
        },
        tags: {},
        ingredients: {},
        instructions: {}
      }
    ).merge({
      average_rating: average_rating,
      thumbnail_url: thumbnail_url
    })

    return res unless @user

    res.merge(
      user_rating: current_user_rating
    )
  end

  private

  def current_user_rating
    Rating.find_by(user: @user, recipe: @recipe)
  end
end
