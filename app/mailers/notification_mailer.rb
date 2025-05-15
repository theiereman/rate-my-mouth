class NotificationMailer < ApplicationMailer
  default from: "contact@dotsncircles.com"

  def test(email)
    mail(to: email, subject: "Hello World!")
  end

  # Envoie un email quand un commentaire est ajouté à une recette
  def new_comment_notification
    @comment = params[:comment]
    @recipe = @comment.recipe
    @recipe_owner = @recipe.user
    @commenter = @comment.user

    return unless @recipe_owner.notification_preference == true
    return if @recipe_owner.id == @commenter.id # Ne pas notifier si l'utilisateur commente sa propre recette

    mail(
      to: @recipe_owner.email,
      subject: "Nouveau commentaire sur votre recette \"#{@recipe.name}\""
    )
  end

  # Envoie un email quand une note est ajoutée à une recette
  def new_rating_notification
    @rating = params[:rating]
    @recipe = @rating.recipe
    @recipe_owner = @recipe.user
    @rater = @rating.user

    return unless @recipe_owner.notification_preference == true
    return if @recipe_owner.id == @rater.id # Ne pas notifier si l'utilisateur note sa propre recette

    mail(
      to: @recipe_owner.email,
      subject: "Nouvelle note sur votre recette \"#{@recipe.name}\""
    )
  end
end
