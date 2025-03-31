class Rating < ApplicationRecord
  validates :score, presence: true, inclusion: { in: 1..5 }

  belongs_to :user
  belongs_to :recipe
end
