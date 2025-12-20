module Authorable
  extend ActiveSupport::Concern

  included do
    def author
      user
    end
  end
end
