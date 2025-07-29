class Recipe < ApplicationRecord
  include Achievable
  include Filterable

  scope :filter_by_name, ->(name) { where("recipes.name LIKE ?", "%#{name}%") }
  scope :filter_by_user_id, ->(user_id) { where(user_id: user_id) }
  scope :filter_by_tags_ids, ->(tag_ids) {
    # Convertir la chaîne séparée par des virgules en array
    tag_ids = tag_ids.is_a?(String) ? tag_ids.split(",").map(&:to_i) : Array(tag_ids)
    joins(:tags)
      .where(tags: {id: tag_ids})
      .group("recipes.id")
      .having("COUNT(DISTINCT tags.id) = ?", tag_ids.size)
      .distinct
  }

  has_one_attached :thumbnail

  attribute :difficulty, :integer
  enum :difficulty, easy: 0, medium: 1, hard: 2

  has_many :comments, as: :commentable, dependent: :destroy
  has_many :ratings, dependent: :destroy
  has_many :notes, dependent: :destroy
  has_many :ingredients, dependent: :destroy
  has_many :instructions, dependent: :destroy

  belongs_to :user, counter_cache: true
  has_many :recipe_tags, dependent: :destroy
  has_many :tags, through: :recipe_tags

  # Nested attributes pour les formulaires
  accepts_nested_attributes_for :ingredients, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :instructions, allow_destroy: true, reject_if: :all_blank

  validates :name, presence: true
  validates :number_of_servings, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :difficulty, presence: true, inclusion: {in: difficulties.keys}

  def difficulty=(value)
    value = value.to_i if value.is_a?(String)
    super
  end

  def average_rating
    return 0.0 if ratings.size.zero?
    ratings.reduce(0) { |sum, rating| sum + rating.value }.to_f / ratings.size
  end

  def thumbnail_url
    if thumbnail.attached?
      Rails.application.routes.url_helpers.rails_blob_path(thumbnail, only_path: true)
    end
  end

  def commenters
    comments.includes(:user).map(&:user).uniq
  end
end
