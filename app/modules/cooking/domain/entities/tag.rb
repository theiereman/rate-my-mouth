class Cooking::Domain::Entities::Tag
  attr_reader :id, :name

  def initialize(name:)
    @name = name
    validate_name!
  end

  def rename(name)
    @name = name
    validate_name!
  end

  private

  def validate_name!
    raise ArgumentError, "Name cannot be blank" if @name.nil? || @name.strip.empty?
    raise ArgumentError, "Name length must be between 2 and 20 characters" unless @name.length.between?(2, 20)
  end

  attr_writer :id
end
