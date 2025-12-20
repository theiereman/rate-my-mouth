class Comment < ApplicationRecord
  include AchievementTriggerable
  include Experiencable

  after_create -> {
    NewCommentToOtherCommentersNotifier.with(record: self).deliver
    NewCommentToAuthorNotifier.with(record: self).deliver
  }

  belongs_to :commentable, polymorphic: true, counter_cache: true
  belongs_to :user, counter_cache: true

  validates :content, presence: true

  scope :on_recipes, -> { where(commentable_type: "Recipe") }

  def recipe
    return commentable if commentable_type == "Recipe"
    nil
  end
end
