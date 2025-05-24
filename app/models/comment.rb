class Comment < ApplicationRecord
  include Achievable
  include Notificationable

  belongs_to :commentable, polymorphic: true
  belongs_to :user

  validates :content, presence: true

  scope :on_recipes, -> { where(commentable_type: "Recipe") }

  # Méthode pour récupérer la recette associée au commentaire
  def recipe
    return commentable if commentable_type == "Recipe"
    nil
  end
end
