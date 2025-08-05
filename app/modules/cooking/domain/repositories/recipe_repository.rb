class Cooking::Domain::Repositories::RecipeRepository
  def initialize(tag_repository)
    raise NotImplementedError
  end

  def all(**filters)
    raise NotImplementedError
  end

  def find_by_id(id)
    raise NotImplementedError
  end

  def save(recipe_entity)
    raise NotImplementedError
  end

  def destroy(id)
    raise NotImplementedError
  end
end
