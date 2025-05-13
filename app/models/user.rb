class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  has_many :recipes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :user_achievements, dependent: :destroy

  has_one_attached :avatar

  validates :username, presence: true, uniqueness: true

  def number_of_recipes
    recipes.count
  end

  def number_of_comments
    comments.count
  end

  def number_of_ratings
    ratings.count
  end

  def avatar_url
    avatar.attached? ? Rails.application.routes.url_helpers.rails_blob_path(avatar, only_path: true) : nil
  end
end
