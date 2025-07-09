class RatingsController < ApplicationController
  include Paginatable

  before_action :set_recipe

  def index
    @ratings = @recipe.ratings.includes(:user).order(created_at: :desc)
    @pagy, @ratings = paginate_collection(@ratings)

    render json: {
      ratings: @ratings.map { |rating| rating.as_json(include: { user: { only: [ :id, :username ], methods: [ :avatar_url ] } }) },
      pagy: pagy_metadata(@pagy)
    }
  end

  def create
    @rating = Rating.find_by(user: current_user, recipe: @recipe)
    is_new_rating = @rating.nil?

    if is_new_rating
      @rating = @recipe.ratings.new(rating_params)
      @rating.user = current_user

      if @rating.save
        redirect_to @recipe
      else
        redirect_to @recipe, alert: "Erreur lors de l'ajout de la note."
      end
    else
      if @rating.update(rating_params)
        redirect_to @recipe, notice: "Note mise à jour."
      else
        redirect_to @recipe, alert: "Impossible de mettre à jour la note"
      end
    end
  end


  private

  def set_recipe
    @recipe = Recipe.find(params[:recipe_id])
  end

  def rating_params
    params.expect(rating: [ :value ])
  end
end
