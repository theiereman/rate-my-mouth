class Cooking::Infrastructure::Repositories::ActiveRecordTagRepository < Cooking::Domain::Repositories::TagRepository
  def popular
    Cooking::Infrastructure::Models::DbTag
      .all
      .order(recipes_count: :desc)
      .limit(10)
      .map { |db_tag| db_tag_to_tags_with_recipes_count(db_tag) }
  end

  def search(name)
    Cooking::Infrastructure::Models::DbTag
      .where("name LIKE ?", "%#{name}%")
      .limit(10)
      .map { |db_tag| db_tag_to_entity(db_tag) }
  end

  def search_with_recipes_count(name)
    Cooking::Infrastructure::Models::DbTag
      .where("name LIKE ?", "%#{name}%")
      .order(recipes_count: :desc)
      .map { |db_tag| db_tag_to_tags_with_recipes_count(db_tag) }
  end

  def find_or_create_by_name(name, category: "general")
    db_tag_to_entity(Cooking::Infrastructure::Models::DbTag.find_or_create_by(name: name))
  end

  private

  def build_base_query
    Cooking::Infrastructure::Models::DbTag.all
  end

  def apply_filters(query, **filters)
    query = query.where("name LIKE ?", "%#{filters[:name]}%") if filters[:name].present?
    query
  end

  def apply_default_ordering_by_recipes_count(query)
    query.order(recipes_count: :desc, name: :asc)
  end

  def db_tag_to_tags_with_recipes_count(db_tag)
    Cooking::Application::Results::Tags::TagWithRecipesCount.new(
      id: db_tag.id,
      name: db_tag.name,
      recipes_count: db_tag.recipes_count
    )
  end

  def db_tag_to_entity(db_tag)
    tag_entity = Cooking::Domain::Entities::Tag.new(
      name: db_tag.name
    )
    tag_entity.send(:id=, db_tag.id)
    tag_entity
  end
end
