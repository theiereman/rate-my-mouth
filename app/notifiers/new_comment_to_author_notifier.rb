# To deliver this notification:
#
# NewCommentToAuthorNotifier.with(record: @comment).deliver
class NewCommentToAuthorNotifier < ApplicationNotifier
  recipients :recipe_author

  deliver_by :email do |config|
    config.mailer = "CommentMailer"
    config.method = :new_comment_to_author
  end

  validates :record, presence: true

  private

  def recipe_author
    return nil if record.user.id == record.recipe.user.id
    record.recipe.user
  end
end
