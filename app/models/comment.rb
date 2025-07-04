class Comment < ApplicationRecord
  include Achievable
  include Notificationable

  belongs_to :commentable, polymorphic: true, counter_cache: true
  belongs_to :user, counter_cache: true

  validates :content, presence: true

  scope :on_recipes, -> { where(commentable_type: "Recipe") }

  # Méthode pour récupérer la recette associée au commentaire
  def recipe
    return commentable if commentable_type == "Recipe"
    nil
  end
end
