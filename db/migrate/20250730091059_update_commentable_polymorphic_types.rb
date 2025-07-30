class UpdateCommentablePolymorphicTypes < ActiveRecord::Migration[8.0]
  def up
    Comment.where(commentable_type: "Recipe").update_all(commentable_type: "Recipes::Models::Recipe")
  end

  def down
    Comment.where(commentable_type: "Recipes::Models::Recipe").update_all(commentable_type: "Recipe")
  end
end
