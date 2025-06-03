class CreateInstructions < ActiveRecord::Migration[8.0]
  def change
    create_table :instructions do |t|
      t.string :name
      t.string :category
      t.references :recipe, null: false, foreign_key: true

      t.timestamps
    end
  end
end
