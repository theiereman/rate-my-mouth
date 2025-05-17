class Recipe < ApplicationRecord
  include Achievable
  include Filterable

  scope :filter_by_name, ->(name) { where("recipes.name LIKE ?", "%#{name}%") }
  scope :filter_by_user_id, ->(user_id) { where(user_id: user_id) }
  scope :filter_by_tags_ids, ->(tag_ids) {
    tag_ids = Array(tag_ids)
    joins(:tags)
    .where(tags: { id: tag_ids })
    .group("recipes.id")
    .having("COUNT(DISTINCT tags.id) = ?", tag_ids.size)
    .distinct
  }

  has_one_attached :thumbnail

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

  def difficulty=(value)
    if value.is_a?(String) && value.to_i.to_s == value
      # Convert numeric string to integer
      value = value.to_i
    end

    if value.is_a?(Integer)
      # Map integer to enum value
      value = { 0 => :easy, 1 => :medium, 2 => :hard }[value] || :easy
    end

    super(value)
  end

  # Accepter les nested attributes pour les tags
  # Pour une association HABTM, nous devons gérer manuellement la création/association des tags
  def tags_attributes=(attributes)
    # Supprimer les tags existants si on reçoit un tableau vide
    self.tags.clear

    # Traiter chaque attribut de tag
    attributes.each do |tag_params|
      # Ignorer les entrées vides
      next if tag_params[:name].blank?

      # Si un ID est fourni, essayer de trouver le tag existant
      if tag_params[:id].present?
        begin
          tag = Tag.find(tag_params[:id])
          self.tags << tag unless self.tags.include?(tag)
        rescue ActiveRecord::RecordNotFound
          # Si le tag n'existe pas, chercher par nom ou créer un nouveau
          find_or_create_tag_by_name(tag_params[:name])
        end
      else
        # Pas d'ID, chercher par nom ou créer un nouveau
        find_or_create_tag_by_name(tag_params[:name])
      end
    end
  end

  # Trouver un tag existant par nom ou en créer un nouveau
  def find_or_create_tag_by_name(name)
    # Chercher un tag existant avec le même nom (insensible à la casse)
    tag = Tag.where("lower(name) = ?", name.downcase).first_or_initialize(name: name)
    # Sauvegarder si c'est un nouveau tag
    tag.save if tag.new_record?
    # Associer le tag à la recette s'il n'est pas déjà associé
    self.tags << tag unless self.tags.include?(tag)
    tag
  end

  def average_rating
    return 0.0 if ratings.size.zero?
    ratings.reduce(0) { |sum, rating| sum + rating.value }.to_f / ratings.size
  end

  def difficulty_value
    Recipe.difficulties[self[:difficulty]]
  end

  def thumbnail_url
    if thumbnail.attached?
      Rails.application.routes.url_helpers.rails_blob_path(thumbnail, only_path: true)
    else
      nil
    end
  end

  private

  def filtering_params
    params.slice(:name, :user_id, :tag_ids)
  end
end
