# To deliver this notification:
#
# NewCommentNotifier.with(record: @comment).deliver
class NewCommentNotifier < ApplicationNotifier
  recipients -> { record.recipe.user }

  deliver_by :email do |config|
    config.mailer = "CommentMailer"
    config.method = :new_comment
  end

  validates :record, presence: true
end
