class AchievementRules
  class CustomRule
    attr_reader :key, :name, :description, :model, :action, :condition

    def initialize(key:, name:, description:, model:, action:, condition:)
      @key       = key
      @name      = name
      @description = description
      @model     = model
      @action    = action.to_s
      @condition = condition
    end

    def satisfied?(event_name, record)
      p "test satisfied"
      p event_name
      # ex. event_name == "post.created" && record.is_a?(Post)
      event_name == "#{model.name.underscore}.#{action}" &&
        condition.call(record)
    end
  end

  def self.rules
    @rules ||= []
  end

  def self.define(&block)
    rules
    instance_eval(&block)
  end

  def self.rule(key:, name:, description:, model:, action:, condition:)
    @rules << CustomRule.new(
      key:       key,
      name:      name,
      description: description,
      model:     model,
      action:    action,
      condition: condition
    )
  end
end

AchievementRules.define do
  rule key: :first_post, name: "Premier post", description: "Créer votre premier post", model: :recipe, action: :created, condition: ->(recipe) { recipe.user.recipes.count >= 1 }
  rule key: :first_comment, name: "Premier commentaire", description: "Créer votre premier commentaire", model: :comment, action: :created, condition: ->(comment) { comment.user.comments.count >= 1 }
  rule key: :first_rating, name: "Premiere note", description: "Créer votre première note", model: :rating, action: :updated, condition: ->(rating) { rating.user.ratings.count >= 1 }
end
