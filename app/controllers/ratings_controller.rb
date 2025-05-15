class RatingsController < ApplicationController
  before_action :set_recipe

  def create
    @rating = Rating.find_by(user: current_user, recipe: @recipe)
    is_new_rating = @rating.nil?

    if is_new_rating
      @rating = @recipe.ratings.new(rating_params)
      @rating.user = current_user

      if @rating.save
        # Envoyer une notification par email pour une nouvelle note
        if @recipe.user != current_user
          NotificationMailer.with(rating: @rating).new_rating_notification.deliver_later
        end

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
