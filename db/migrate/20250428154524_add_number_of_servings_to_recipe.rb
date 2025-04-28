class AddNumberOfServingsToRecipe < ActiveRecord::Migration[8.0]
  def change
    change_table :recipes do |t|
      t.integer :number_of_servings, default: 4, null: false
    end
  end
end
