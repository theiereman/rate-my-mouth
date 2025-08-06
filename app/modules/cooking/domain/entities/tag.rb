class Cooking::Domain::Entities::Tag
  attr_reader :id, :name

  def initialize(name:)
    @name = validate_name(name)
  end

  def rename(name)
    @name = validate_name(name)
  end

  private

  def validate_name(name)
    raise ArgumentError, "Name cannot be blank" if name.nil? || name.strip.empty?
    raise ArgumentError, "Name length must be between 2 and 20 characters" unless name.length.between?(2, 20)
    name
  end

  attr_writer :id
end
