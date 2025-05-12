class CreateTags < ActiveRecord::Migration[8.0]
  def change
    create_table :tags do |t|
      t.string :name

      t.timestamps
    end

    create_join_table :recipes, :tags do |t|
      t.index [ :recipe_id, :tag_id ]
      t.index [ :tag_id, :recipe_id ]
    end
  end
end
