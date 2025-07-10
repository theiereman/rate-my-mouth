class Tag < ApplicationRecord
  has_many :recipe_tags, dependent: :destroy
  has_many :recipes, through: :recipe_tags

  validates :name, presence: true, uniqueness: {case_sensitive: false}, length: {minimum: 2, maximum: 20}

  # Méthode pour trouver ou créer un tag par son nom
  def self.find_or_initialize_by_name(name)
    where("lower(name) = ?", name.downcase).first_or_initialize(name: name)
  end
end
