class Cooking::Infrastructure::Repositories::ActiveRecordRecipeRepository < Cooking::Domain::Repositories::RecipeRepository
  include Shared::Concerns::PaginatableRepository

  def all(pagination_params, filters)
    query = Cooking::Infrastructure::Models::DbRecipe.includes(:tags)
    query = apply_filters(query, **filters) if filters.any?

    pagy, records = paginate_collection(query, **pagination_params)

    recipes_entities = records.order(created_at: :desc).map { |db_recipe| recipe_to_entity(db_recipe) }

    Shared::Application::Results::PaginatedResult.new(
      data: recipes_entities,
      pagy: pagy
    )
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
    pp db_recipe.tags

    recipe = Cooking::Domain::Entities::Recipe.new(
      name: db_recipe[:name],
      number_of_servings: db_recipe[:number_of_servings],
      difficulty: db_recipe[:difficulty],
      tags: db_recipe.tags.map { |db_tag|
        Cooking::Domain::Entities::Tag.new(
            name: db_tag.name
          )
      },
      user_id: db_recipe[:user_id]
    )
    recipe.send(:"id=", db_recipe[:id])
    recipe
  end
end
