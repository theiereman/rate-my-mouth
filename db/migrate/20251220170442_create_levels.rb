class CreateLevels < ActiveRecord::Migration[8.0]
  def change
    create_table :levels do |t|
      t.integer :xp
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
