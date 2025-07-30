class Recipes::Models::Instruction < ApplicationRecord
  belongs_to :recipe, class_name: "Recipes::Models::Recipe"

  validates :name, presence: true
end
