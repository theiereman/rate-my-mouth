class Tag < ApplicationRecord
  has_and_belongs_to_many :recipes

  validates :name, presence: true, uniqueness: { case_sensitive: false }

  # Méthode pour trouver ou créer un tag par son nom
  def self.find_or_initialize_by_name(name)
    where("lower(name) = ?", name.downcase).first_or_initialize(name: name)
  end

  def number_of_recipes
    recipes.count
  end
end
