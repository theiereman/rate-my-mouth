class RemoveOldArrayColumns < ActiveRecord::Migration[8.0]
  def change
    remove_column :recipes, :ingredients_data, :text
    remove_column :recipes, :instructions_data, :text
  end
end
