class Cooking::Infrastructure::Models::DbTag < ApplicationRecord
  def self.table_name
    "tags"
  end

  has_many :recipe_tags, dependent: :destroy, class_name: "Cooking::Infrastructure::Models::DbRecipeTags", foreign_key: "tag_id"
  has_many :recipes, through: :recipe_tags

  validates :name, presence: true, uniqueness: {case_sensitive: false}, length: {minimum: 2, maximum: 20}
end
