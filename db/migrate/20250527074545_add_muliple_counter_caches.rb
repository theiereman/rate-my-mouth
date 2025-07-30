class AddMulipleCounterCaches < ActiveRecord::Migration[8.0]
  def up
    add_column :users, :recipes_count, :integer, default: 0, null: false
    add_column :users, :comments_count, :integer, default: 0, null: false
    add_column :users, :ratings_count, :integer, default: 0, null: false
    add_column :recipes, :comments_count, :integer, default: 0, null: false

    # Mettre à jour les compteurs existants
    Users::Models::User.all.each do |user|
      Users::Models::User.reset_counters(user.id, :recipes_count)
      Users::Models::User.reset_counters(user.id, :comments_count)
      Users::Models::User.reset_counters(user.id, :ratings_count)
    end

    Recipe.all.each do |recipe|
      Recipe.reset_counters(recipe.id, :comments_count)
    end
  end

  def down
    remove_column :users, :recipes_count
    remove_column :users, :comments_count
    remove_column :users, :ratings_count
    remove_column :recipes, :comments_count
  end
end
