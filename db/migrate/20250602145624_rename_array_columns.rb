class RenameArrayColumns < ActiveRecord::Migration[8.0]
  def change
    rename_column :recipes, :ingredients, :ingredients_data
    rename_column :recipes, :instructions, :instructions_data
  end
end
