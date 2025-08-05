class Cooking::Infrastructure::Models::DbRecipe < ApplicationRecord
  def self.table_name
    "recipes"
  end

  include Achievable

  has_one_attached :thumbnail

  attribute :difficulty, :integer
  enum :difficulty, easy: 0, medium: 1, hard: 2

  has_many :comments, as: :commentable, dependent: :destroy, class_name: "Recipes::Models::Comment"
  has_many :ratings, dependent: :destroy, class_name: "Recipes::Models::Rating"
  has_many :notes, dependent: :destroy, class_name: "Recipes::Models::Note"
  has_many :ingredients, dependent: :destroy, class_name: "Recipes::Models::Ingredient"
  has_many :instructions, dependent: :destroy, class_name: "Recipes::Models::Instruction"

  belongs_to :user, counter_cache: true, class_name: "Users::Models::User"
  has_many :recipe_tags, dependent: :destroy, class_name: "Cooking::Infrastructure::Models::DbRecipeTags", foreign_key: "recipe_id"
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

  def commenters
    comments.includes(:user).map(&:user).uniq
  end
end
