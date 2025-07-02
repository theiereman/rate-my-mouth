class CommentMailer < ApplicationMailer
  def new_comment
    @comment = params[:record]

    mail(
      to: params[:recipient].email,
      subject: "Nouveau commentaire sur votre recette \"#{@comment.recipe.name}\""
    )
  end
end
