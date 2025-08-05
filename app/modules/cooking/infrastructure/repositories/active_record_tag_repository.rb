class Cooking::Infrastructure::Repositories::ActiveRecordTagRepository < Cooking::Domain::Repositories::TagRepository
  def popular
    Cooking::Infrastructure::Models::DbTag
      .all
      .order(recipes_count: :desc)
      .map { |db_tag| result(db_tag) }
  end

  def search(name)
    Cooking::Infrastructure::Models::DbTag
      .where("name LIKE ?", "%#{name}%")
      .map { |db_tag| result(db_tag) }
  end

  def find_or_create_by_name(name, category: "general")
    tag_to_entity(Cooking::Infrastructure::Models::DbTag.find_or_create_by(name: name))
  end

  private

  def result(db_tag)
    {tag: tag_to_entity(db_tag), count: db_tag.recipes_count}
  end

  def tag_to_entity(db_tag)
    tag_entity = Cooking::Domain::Entities::Tag.new(
      name: db_tag.name
    )
    tag_entity.send(:id=, db_tag.id)
    tag_entity
  end
end
