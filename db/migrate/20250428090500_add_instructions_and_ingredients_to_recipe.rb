class AddInstructionsAndIngredientsToRecipe < ActiveRecord::Migration[8.0]
  def change
    change_table :recipes do |t|
      t.text :instructions
      t.text :ingredients
    end
  end
end
