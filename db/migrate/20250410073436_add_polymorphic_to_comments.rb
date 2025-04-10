class AddPolymorphicToComments < ActiveRecord::Migration[8.0]
  def change
    remove_column :comments, :recipe_id, :integer, if_exists: true

    add_column :comments, :commentable_type, :string
    add_column :comments, :commentable_id, :integer
    add_index :comments, [ :commentable_type, :commentable_id ]
  end
end
