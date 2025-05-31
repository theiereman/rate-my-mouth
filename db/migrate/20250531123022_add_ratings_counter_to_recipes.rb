class AddRatingsCounterToRecipes < ActiveRecord::Migration[8.0]
  def up
    add_column :recipes, :ratings_count, :integer, default: 0, null: false

    Recipe.all.each do |recipe|
      Recipe.reset_counters(recipe.id, :ratings_count)
    end
  end

  def down
    remove_column :recipes, :ratings_count
  end
end
