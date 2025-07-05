class RatingMailer < ApplicationMailer
  def new_rating
    @rating = params[:record]

    mail(
      to: params[:recipient].email,
      subject: "Nouvelle note sur votre recette \"#{@rating.recipe.name}\""
    )
  end
end
