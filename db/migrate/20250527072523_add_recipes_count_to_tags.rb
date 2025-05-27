class AddRecipesCountToTags < ActiveRecord::Migration[8.0]
  def up
    add_column :tags, :recipes_count, :integer, default: 0, null: false

    # Mettre à jour les compteurs existants
    Tag.reset_counters(Tag.pluck(:id), :recipe_tags)
  end

  def down
    remove_column :tags, :recipes_count
  end
end
