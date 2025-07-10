class ChangeRecipesTagsToHasManyThrough < ActiveRecord::Migration[8.0]
  def up
    # Créer la nouvelle table recipe_tags avec une clé primaire
    create_table :recipe_tags do |t|
      t.references :recipe, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
      t.timestamps

      t.index [:recipe_id, :tag_id], unique: true
    end

    # Migrer les données existantes de recipes_tags vers recipe_tags
    if table_exists?(:recipes_tags)
      execute <<-SQL
        INSERT INTO recipe_tags (recipe_id, tag_id, created_at, updated_at)
        SELECT recipe_id, tag_id, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
        FROM recipes_tags
      SQL

      # Supprimer l'ancienne table de jointure
      drop_join_table :recipes, :tags
    end
  end

  def down
    # Recréer la table de jointure
    create_join_table :recipes, :tags do |t|
      t.index [:recipe_id, :tag_id]
      t.index [:tag_id, :recipe_id]
    end

    # Migrer les données vers l'ancienne structure
    if table_exists?(:recipe_tags)
      execute <<-SQL
        INSERT INTO recipes_tags (recipe_id, tag_id)
        SELECT recipe_id, tag_id FROM recipe_tags
      SQL

      # Supprimer la nouvelle table
      drop_table :recipe_tags
    end
  end
end
