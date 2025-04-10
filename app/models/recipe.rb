class Recipe < ApplicationRecord
  has_many :comments, as: :commentable, dependent: :destroy
  has_many :ratings, dependent: :destroy
  belongs_to :user

  validates :name, presence: true
end
