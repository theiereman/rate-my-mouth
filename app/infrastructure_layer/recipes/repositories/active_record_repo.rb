class Recipes::Repositories::ActiveRecordRepo < Recipes::Repositories::RecipeRepository
  def find_by_id(id)
    Recipe.find(id)
  end

  def all
    Recipe.all
  end

  def save(recipe)
    recipe_record = Recipe.find_or_initialize_by(id: recipe.id)
    recipe_record.name = recipe.name
    recipe_record.description = recipe.description
    recipe_record.url = recipe.url
    recipe_record.number_of_servings = recipe.number_of_servings
    recipe_record.difficulty = recipe.difficulty
    recipe_record.ingredients = recipe.ingredients
    recipe_record.instructions = recipe.instructions
    recipe_record.user_id = recipe.user_id
    recipe_record.save!
    recipe.id = recipe_record.id
    recipe
  end

  def delete(id)
    Recipe.find(id).destroy!
  end
end
