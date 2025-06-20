class Note < ApplicationRecord
  belongs_to :user
  belongs_to :recipe

  validates :user_id, uniqueness: { scope: :recipe_id, message: "You have already created a note for this recipe" }
end
