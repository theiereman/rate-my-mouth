class XpService
  def self.call(user, model, action)
    new(user, model, action).call
  end

  XP_MAPPING = {
    recipe: {
      create: 50,
      update: 10
    },
    comment: {
      create: 20,
      update: 5
    },
    rating: {
      create: 30,
      update: 10
    },
    base: {
      create: 5,
      update: 5
    }
  }.freeze

  def initialize(user, model, action)
    @user = user
    @model = model
    @action = action
  end

  def call
    amount = XP_MAPPING.dig(@model.class.name.downcase.to_sym, @action.to_s.downcase.to_sym)
    amount ||= XP_MAPPING.dig(:base, @action.to_s.downcase.to_sym)
    return unless amount

    add_xp(amount)
  end

  private

  def add_xp(amount)
    @user.level ||= Level.create(user: @user, xp: 0)
    @user.level.xp += amount
    @user.level.save!
  end
end
