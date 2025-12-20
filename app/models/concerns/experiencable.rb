module Experiencable
  extend ActiveSupport::Concern
  include Authorable

  included do
    after_create -> { XpService.call(author, self, :create) }
    after_update -> { XpService.call(author, self, :update) }
  end
end
