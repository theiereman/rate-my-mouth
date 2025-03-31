class Recipe < ApplicationRecord
  has_many :ratings, dependent: :destroy
  has_many :ingredients

  def average_rating
    ratings.average(:score).to_f
  end
end
