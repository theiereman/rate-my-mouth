class AchievementRules
  class Rule
    attr_reader :key, :name, :description, :triggers, :condition

    def initialize(key:, name:, description:, triggers:, condition:)
      @key = key
      @name = name
      @description = description
      @triggers = normalize_triggers(triggers)
      @condition = condition
    end

    def satisfied?(event_name, record)
      @triggers.any? do |model_name, action|
        # Extract the model name from the event_name (e.g., "recipe.created" -> "recipe")
        event_model = event_name.split(".").first

        # Get the model name from the trigger
        model_class_name = model_name.is_a?(String) ? model_name : model_name.name
        model_underscore = model_class_name.underscore

        # Check if the event matches this trigger
        event_model == model_underscore &&
          event_name.end_with?(".#{action}") &&
          condition.call(record)
      end
    end

    private

    def normalize_triggers(triggers)
      result = []

      triggers.each do |model, actions|
        Array(actions).each do |action|
          result << [ model, action.to_s ]
        end
      end

      result
    end
  end

  def self.rules
    @rules ||= []
  end

  def self.define(&block)
    rules
    instance_eval(&block)
  end

  def self.rule(key:, name:, description:, triggers:, condition:)
    @rules << Rule.new(
      key: key,
      name: name,
      description: description,
      triggers: triggers,
      condition: condition
    )
  end
end

# WARNING: keys are used to store unlock status in user_achievements table
AchievementRules.define do
  # Single model, single action
  rule key: :first_recipe,
       name: "Première recette",
       description: "Créer votre première recette",
       triggers: { "Recipe" => :created },
       condition: ->(recipe) { recipe.user.recipes.count >= 1 }

  # Single model, single action
  rule key: :first_comment,
       name: "Premier commentaire",
       description: "Créer votre premier commentaire",
       triggers: { "Comment" => :created },
       condition: ->(comment) { comment.user.comments.count >= 1 }

  # Single model, single action
  rule key: :first_rating,
       name: "Première note",
       description: "Créer votre première note",
       triggers: { "Rating" => :created },
       condition: ->(rating) { rating.user.ratings.count >= 1 }

  # Single model, single action
  rule key: :great_audience,
       name: "Bon public",
       description: "Noter 10 recettes avec la note maximale",
       triggers: { "Rating" => :created },
       condition: ->(rating) { rating.user.ratings.where(value: 5).count >= 10 }

  # Single model, single action
  rule key: :hater,
       name: "Haineux",
       description: "Noter 10 recettes avec la note minimale",
       triggers: { "Rating" => :created },
       condition: ->(rating) { rating.user.ratings.where(value: 0.5).count >= 10 }

  # Example of multiple models triggering the same achievement
  rule key: :food_critique,
       name: "Critique gastronomique",
       description: "Ajouter une critique complete (note et commentaire) sur 10 recettes",
       triggers: {
         "Rating" => :created,
         "Comment" => :created
       },
       condition: ->(record) {
        user = record.user

        recipe_ids_with_ratings = user.ratings.pluck(:recipe_id)
        recipe_ids_with_comments = user.comments.on_recipes.where(commentable_id: recipe_ids_with_ratings).pluck(:commentable_id)

         total_critiques = recipe_ids_with_comments.uniq.count
         return true if total_critiques >= 10

         false
       }

  rule key: :bad_reputation,
       name: "Mauvaise réputation",
       description: "Avoir une note moyenne inférieure à 2 sur 10 recettes",
       triggers: { "Rating" => :created },
       condition: ->(rating) { rating.user.recipes.count >= 10 && rating.user.recipes.joins(:ratings).average("ratings.value").to_f < 2.0 }

  rule key: :feast,
       name: "Joyeux festin",
       description: "Créer une recette avec des quantités pour 10 personnes (ou plus)",
       triggers: { "Recipe" => :created },
       condition: ->(recipe) { recipe.user.recipes.where("number_of_servings >= 10").count >= 1 }

  rule key: :spammer,
       name: "Forceur",
       description: "Ajouter 10 commentaires sur la même recette",
       triggers: { "Comment" => :created },
       condition: ->(recipe) { recipe.user.comments.on_recipes.group(:commentable_id).count.any? { |_, count| count >= 10 } }

  # NOTE: rails is currently having issue with the ingredients and instructions attributes because stored as nil when empty array (serialized string)
  # rule key: :chemist,
  #      name: "Chimiste",
  #      description: "Créer une recette avec au minimum 20 ingrédients et 15 étapes",
  #      triggers: { "Recipe" => :created },
  #      condition: ->(recipe) { recipe.user.recipes.any? { |r| p r.ingredients.size >= 20 && r.instructions.size >= 15 } }
  #
  ## rule key: :low_effort,
  #      name: "Flemmard",
  #      description: "Créer une recette avec au maximum 2 ingrédients et 3 étapes",
  #      triggers: { "Recipe" => :created },
  #      condition: ->(recipe) { recipe.user.recipes.any? { |r| p r.ingredients.size <= 2 && r.instructions.size <= 3 } }
end
