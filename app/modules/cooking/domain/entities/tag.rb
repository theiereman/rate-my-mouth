class Cooking::Domain::Entities::Tag
  attr_reader :id, :name, :recipes_count

  def initialize(name:)
    @name = name
  end

  def rename(name)
    @name = name
  end

  private

  attr_writer :id, :name, :recipes_count
end
