class Recipes::Models::Note < ApplicationRecord
  belongs_to :user, class_name: "Users::Models::User"
  belongs_to :recipe, class_name: "Recipes::Models::Recipe"

  validates :user_id, uniqueness: {scope: :recipe_id, message: "You have already created a note for this recipe"}
end
