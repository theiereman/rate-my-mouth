class Comment < ApplicationRecord
  include Achievable

  belongs_to :commentable, polymorphic: true
  belongs_to :user

  validates :content, presence: true
end
