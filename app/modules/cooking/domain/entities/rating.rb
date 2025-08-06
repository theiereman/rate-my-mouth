class Cooking::Domain::Entities::Rating
  attr_reader :id, :user_id, :recipe_id, :value

  def initialize(user_id:, recipe_id:, value:)
    @user_id = user_id
    @recipe_id = recipe_id
    @value = validate_value(value)
  end

  def update_value(new_value)
    @value = validate_value(new_value)
  end

  private

  def validate_value(value)
    raise ArgumentError, "Invalid rating value" unless value.is_a?(Numeric) && value.between?(0, 5)
    value
  end

  attr_writer :id
end
