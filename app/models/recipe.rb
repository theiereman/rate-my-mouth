class Recipe < ApplicationRecord
  include Achievable

  attribute :difficulty, :integer
  enum :difficulty, easy: 0, medium: 1, hard: 2

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :ratings, dependent: :destroy
  belongs_to :user
  has_and_belongs_to_many :tags

  validates :name, presence: true
  validates :number_of_servings, presence: true, numericality: { only_integer: true, greater_than: 0 }

  serialize :ingredients, coder: JSON
  serialize :instructions, coder: JSON

  def average_rating
    return 0.0 if ratings.size.zero?
    ratings.reduce(0) { |sum, rating| sum + rating.value }.to_f / ratings.size
  end

  def difficulty_value
    Recipe.difficulties[self[:difficulty]]
  end
end
