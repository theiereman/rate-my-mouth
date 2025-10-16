class RecipePresenter
  def self.minimal_recipe_json(recipe)
    new(recipe).as_minimal_json
  end

  def self.full_recipe_json(recipe)
    new(recipe).as_json
  end

  def initialize(recipe)
    @recipe = recipe
  end

  def as_json
    @recipe.as_json(include: {
      user: {only: [:id, :username, :ratings_count]},
      tags: {},
      ingredients: {},
      instructions: {}
    }, methods: [:average_rating, :thumbnail_url])
  end

  def as_minimal_json
    @recipe.as_json(
      include: {
        user: {only: [:id, :username, :ratings_count]},
        tags: {}
      },
      methods: [:average_rating, :thumbnail_url]
    )
  end
end
