class Cooking::Infrastructure::Models::DbRecipeTags < ApplicationRecord
  def self.table_name
    "recipe_tags"
  end

  belongs_to :recipe, class_name: "Cooking::Infrastructure::Models::DbRecipe"
  belongs_to :tag, class_name: "Cooking::Infrastructure::Models::DbTag", counter_cache: :recipes_count

  validates :recipe_id, uniqueness: {scope: :tag_id}
end
