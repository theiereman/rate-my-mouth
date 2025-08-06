class Cooking::Infrastructure::Models::DbRating < ApplicationRecord
  def self.table_name
    "ratings"
  end

  belongs_to :user, counter_cache: true, class_name: "Users::Models::User"
  belongs_to :recipe, counter_cache: true, class_name: "Recipes::Models::Recipe"

  validates :value, presence: true, numericality: {only_float: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5}
  validates :user_id, uniqueness: {scope: :recipe_id, message: "has already rated this recipe"}
end
