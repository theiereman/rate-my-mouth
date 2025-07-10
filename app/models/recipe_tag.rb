class RecipeTag < ApplicationRecord
  belongs_to :recipe
  belongs_to :tag, counter_cache: :recipes_count

  validates :recipe_id, uniqueness: {scope: :tag_id}
end
