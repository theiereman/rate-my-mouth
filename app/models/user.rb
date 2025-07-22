class User < ApplicationRecord
  include Filterable

  scope :filter_by_username, ->(username) { where("users.username LIKE ?", "%#{username}%") }

  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :validatable

  has_many :recipes, dependent: :destroy
  has_many :comments, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :user_achievements, dependent: :destroy

  has_many :notifications, class_name: "Noticed::Notification", as: :recipient

  has_one_attached :avatar do |attachable|
    attachable.variant :thumb, resize_to_limit: [100, 100], preprocessed: true
  end

  validates :username, presence: true, uniqueness: true
  validates :email, presence: true, uniqueness: true, format: {with: URI::MailTo::EMAIL_REGEXP}

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
    if avatar.attached?
      Rails.application.routes.url_helpers.rails_blob_path(avatar.variant(:thumb), only_path: true)
    end
  end
end
