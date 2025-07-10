class Rating < ApplicationRecord
  include Achievable
  include Notificationable

  belongs_to :user, counter_cache: true
  belongs_to :recipe, counter_cache: true

  validates :value, presence: true, numericality: {only_float: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5}

  validates :user_id, uniqueness: {scope: :recipe_id, message: "has already rated this recipe"}
end
