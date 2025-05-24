class Rating < ApplicationRecord
  include Achievable
  include Notificationable

  belongs_to :user
  belongs_to :recipe

  validates :value, presence: true, numericality: { only_float: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }
end
