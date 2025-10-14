# To deliver this notification:
#
# NewCommentToOtherCommentersNotifier.with(record: @comment, commenter: @user).deliver
class NewCommentToOtherCommentersNotifier < ApplicationNotifier
  recipients :users_that_are_not_author_and_current_commenter

  deliver_by :email do |config|
    config.mailer = "CommentMailer"
    config.method = :new_comment_to_commenter
  end

  validates :record, presence: true

  private

  def users_that_are_not_author_and_current_commenter
    record.recipe.commenters.filter { |commenter| commenter.id != record.user.id && commenter.id != record.recipe.user.id }
  end
end
