class Recipe < ApplicationRecord
  include AchievementTriggerable
  include Filterable
  include Experiencable

  ORDERING_TYPE = %w[recent top_rated popular].freeze
  FILTERING_TYPE = %w[name user_id tags_ids].freeze

  # ordering scopes
  scope :recent, -> { order(created_at: :desc) }
  scope :popular, -> { order(ratings_count: :desc, comments_count: :desc) }
  scope :top_rated, -> {
    left_joins(:ratings)
      .group("recipes.id")
      .order(Arel.sql("COALESCE(AVG(ratings.value), 0) DESC"))
  }

  # filtering scopes
  scope :filter_by_name, ->(name) { where("recipes.name LIKE ?", "%#{name}%") }
  scope :filter_by_user_id, ->(user_id) { where(user_id: user_id) }
  scope :filter_by_tags_ids, ->(tag_ids) {
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

  accepts_nested_attributes_for :ingredients, allow_destroy: true, reject_if: :all_blank
  accepts_nested_attributes_for :instructions, allow_destroy: true, reject_if: :all_blank

  validates :name, presence: true
  validates :number_of_servings, presence: true, numericality: {only_integer: true, greater_than: 0}
  validates :difficulty, presence: true, inclusion: {in: difficulties.keys}

  def self.ordered(ordering_type = nil)
    raise ArgumentError, "Invalid ordering type" if ordering_type && !ORDERING_TYPE.include?(ordering_type.to_s)
    return recent unless ordering_type
    send(ordering_type)
  end

  def self.filtered(filters)
    valid_filters = filters.select { |key, value| FILTERING_TYPE.include?(key.to_s) && value.present? }

    if valid_filters.any?
      filter(valid_filters)
    else
      all
    end
  end

  # FIXME: temp hack to make it work when you pass the thumbnail as recipe_param
  # it breaks the whole params hash and make value change type etc, please send help
  def difficulty=(value)
    if value.is_a?(String) && value.to_i.to_s == value
      value = value.to_i
    end

    if value.is_a?(Integer)
      value = {0 => :easy, 1 => :medium, 2 => :hard}[value] || :easy
    elsif value.is_a?(String) && !Recipe.difficulties.key?(value.to_sym)
      value = :easy
    end

    super
  end

  def tags_attributes=(attributes)
    tags.clear

    # FIXME: temp hack to make it work when you pass the thumbnail as recipe_param
    # it breaks the whole params hash and make value change type etc, please send help
    attributes = attributes.values if attributes.is_a?(Hash)

    attributes.each do |tag_params|
      next if tag_params[:name].blank?

      if tag_params[:id].present?
        begin
          tag = Tag.find(tag_params[:id])
          tags << tag unless tags.include?(tag)
        rescue ActiveRecord::RecordNotFound
          find_or_create_tag_by_name(tag_params[:name])
        end
      else
        find_or_create_tag_by_name(tag_params[:name])
      end
    end
  end

  # TODO: move to tag model
  def find_or_create_tag_by_name(name)
    tag = Tag.where("lower(name) = ?", name.downcase).first_or_initialize(name: name)
    tag.save if tag.new_record?
    tags << tag unless tags.include?(tag)
    tag
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
