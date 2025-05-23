class AddTitleToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :title, :string
  end
end
