class AddDescriptionToRecipes < ActiveRecord::Migration[8.0]
  def change
    change_table :recipes do |t|
      t.text :description
    end
  end
end
