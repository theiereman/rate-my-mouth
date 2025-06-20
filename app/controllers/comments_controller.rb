class CommentsController < ApplicationController
  before_action :set_commentable
  before_action :set_comment, only: [ :update, :destroy ]

  def create
    @comment = @commentable.comments.new(comment_params)
    @comment.user = current_user

    if @comment.save
      redirect_to @commentable
    else
      redirect_to @commentable, alert: "Erreur lors de l'ajout du commentaire."
    end
  end

  def update
    if @comment.user == current_user && @comment.update(comment_params)
      redirect_to @commentable
    else
      redirect_to @commentable, alert: "Erreur lors de la modification du commentaire."
    end
  end

  def destroy
    if @comment.user == current_user
      @comment.destroy
      redirect_to @commentable
    else
      redirect_to @commentable, alert: "Erreur lors de la suppression du commentaire."
    end
  end

  private

  def set_commentable
    if params[:recipe_id]
      @commentable = Recipe.find(params[:recipe_id])
    end
  end

  def set_comment
    @comment = @commentable.comments.find(params[:id])
  end

  def comment_params
    params.expect(comment: [ :content ])
  end
end
