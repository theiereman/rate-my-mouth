class Cooking::Infrastructure::Repositories::ActiveRecordRecipeRepository < Cooking::Domain::Repositories::RecipeRepository
  def initialize(tag_repository: Cooking::Infrastructure::Repositories::ActiveRecordTagRepository.new)
    @tag_repository = tag_repository
  end

  def all(**filters)
    query = Cooking::Infrastructure::Models::DbRecipe.all.includes(:tags)
    query = apply_filters(query, **filters) if filters.any?

    query.map do |db_recipe|
      recipe_to_entity(db_recipe)
    end
  end

  def find_by_id(id)
    recipe_to_entity(Cooking::Infrastructure::Models::DbRecipe.find_by(id: id))
  end

  def save(recipe_entity)
    db_recipe = Cooking::Infrastructure::Models::DbRecipe.new(recipe_entity.to_h)
    db_recipe.save
  end

  def destroy(id)
    db_recipe = Cooking::Infrastructure::Models::DbRecipe.find_by(id: id)
    db_recipe&.destroy
  end

  private

  def apply_filters(query, **filters)
    query = query.where("recipes.name LIKE ?", "%#{filters[:name]}%") if filters[:name].present?
    query = query.where("recipes.user_id = ?", filters[:user_id]) if filters[:user_id].present?
    if filters[:tags_ids].present?
      tag_ids = filters[:tags_ids].is_a?(String) ? filters[:tags_ids].split(",").map(&:to_i) : Array(filters[:tags_ids])
      query = query.joins(:tags)
        .where(tags: {id: tag_ids})
        .group("recipes.id")
        .having("COUNT(DISTINCT tags.id) = ?", tag_ids.size)
    end
    query
  end

  def recipe_to_entity(db_recipe)
    recipe = Cooking::Domain::Entities::Recipe.new(
      name: db_recipe[:name],
      number_of_servings: db_recipe[:number_of_servings],
      difficulty: db_recipe[:difficulty],
      tags: db_recipe.tags.map { |db_tag| @tag_repository.send(:db_tag_to_entity, db_tag) }
    )
    recipe.send(:"id=", db_recipe[:id])
    recipe
  end
end
