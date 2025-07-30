class NotesController < ApplicationController
  before_action :set_recipe

  def show_for_user
    @note = @recipe.notes.find_by(user: current_user) || @recipe.notes.new
    render json: @note.content
  end

  def update_for_user
    @note = @recipe.notes.find_by(user: current_user) || @recipe.notes.new
    @note.user = current_user
    @note.content = params[:notes]
    @note.save
    redirect_to @recipe, notice: "Notes enregistrées"
  end

  private

  def set_recipe
    @recipe = Recipes::Models::Recipe.find(params[:recipe_id])
  end
end
