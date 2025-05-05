class AddDifficultyToRecipes < ActiveRecord::Migration[8.0]
  def change
    add_column :recipes, :difficulty, :integer, default: 0, null: false
  end
end
