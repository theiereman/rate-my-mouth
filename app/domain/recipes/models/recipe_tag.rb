class Recipes::Models::RecipeTag < ApplicationRecord
  def self.model_name # for routes
    ActiveModel::Name.new(self, nil, "RecipeTag")
  end

  belongs_to :recipe, class_name: "Recipes::Models::Recipe"
  belongs_to :tag, class_name: "Recipes::Models::Tag", counter_cache: :recipes_count

  validates :recipe_id, uniqueness: {scope: :tag_id}
end
