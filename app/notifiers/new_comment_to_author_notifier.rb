# To deliver this notification:
#
# NewCommentToAuthorNotifier.with(record: @comment).deliver
class NewCommentToAuthorNotifier < ApplicationNotifier
  recipients -> { record.recipe.user }

  deliver_by :email do |config|
    config.mailer = "CommentMailer"
    config.method = :new_comment_to_author
    config.if = -> { recipient.notification_preference? }
  end

  validates :record, presence: true
end
