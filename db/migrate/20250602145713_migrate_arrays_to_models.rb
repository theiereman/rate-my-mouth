class MigrateArraysToModels < ActiveRecord::Migration[8.0]
  def up
    Recipe.find_each do |recipe|
      migrate_ingredients(recipe)
      migrate_instructions(recipe)
    end
  end

  def down
    # Restaurer les arrays depuis les modèles
    Recipe.find_each do |recipe|
      ingredients_array = recipe.ingredients.pluck(:name)
      instructions_array = recipe.instructions.pluck(:name)

      recipe.update_columns(
        ingredients_data: ingredients_array,
        instructions_data: instructions_array
      )
    end

    # Supprimer les données des nouveaux modèles
    Instruction.delete_all
    Ingredient.delete_all
  end

  private

  def migrate_ingredients(recipe)
    return unless recipe.ingredients_data.present?

    recipe.ingredients_data.each do |ingredient_name|
      recipe.ingredients.create!(
        name: ingredient_name.to_s.strip,
        category: "" # Par défaut, pas de catégorie
      )
    end
  end

  def migrate_instructions(recipe)
    return unless recipe.instructions_data.present?

    recipe.instructions_data.each do |instruction_name|
      recipe.instructions.create!(
        name: instruction_name.to_s.strip,
        category: "" # Par défaut, pas de catégorie
      )
    end
  end
end
