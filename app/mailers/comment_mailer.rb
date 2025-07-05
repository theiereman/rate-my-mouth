class CommentMailer < ApplicationMailer
  def new_comment_to_author
    @comment = params[:record]

    mail(
      to: params[:recipient].email,
      subject: "Nouveau commentaire sur votre recette \"#{@comment.recipe.name}\""
    )
  end

  def new_comment_to_commenter
    @comment = params[:record]
    mail(
      to: params[:recipient].email,
      subject: "Nouveau commentaire sur la recette \"#{@comment.recipe.name}\""
    )
  end
end
