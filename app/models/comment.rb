class Comment < ApplicationRecord
  include Achievable
  include Notificationable

  belongs_to :commentable, polymorphic: true, counter_cache: true
  belongs_to :user, counter_cache: true

  has_many :noticed_events, as: :record, dependent: :destroy, class_name: "Noticed::Event"
  has_many :notifications, through: :noticed_events, class_name: "Noticed::Notification"

  validates :content, presence: true

  scope :on_recipes, -> { where(commentable_type: "Recipe") }

  # Méthode pour récupérer la recette associée au commentaire
  def recipe
    return commentable if commentable_type == "Recipe"
    nil
  end
end
