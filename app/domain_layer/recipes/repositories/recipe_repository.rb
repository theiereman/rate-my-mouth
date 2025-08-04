class Recipes::Repositories::RecipeRepository
  def find_by_id(id)
    raise NotImplementedError
  end

  def all
    raise NotImplementedError
  end

  def save(recipe)
    raise NotImplementedError
  end

  def delete(id)
    raise NotImplementedError
  end
end
