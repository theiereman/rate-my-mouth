class Rating < ApplicationRecord
  include Achievable
  include Notificationable

  belongs_to :user, counter_cache: true
  belongs_to :recipe, counter_cache: true

  has_many :noticed_events, as: :record, dependent: :destroy, class_name: "Noticed::Event"
  has_many :notifications, through: :noticed_events, class_name: "Noticed::Notification"

  validates :value, presence: true, numericality: { only_float: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 5 }

  validates :user_id, uniqueness: { scope: :recipe_id, message: "has already rated this recipe" }
end
