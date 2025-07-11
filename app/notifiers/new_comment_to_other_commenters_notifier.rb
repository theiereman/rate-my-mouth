# To deliver this notification:
#
# NewCommentToOtherCommentersNotifier.with(record: @comment, commenter: @user).deliver
class NewCommentToOtherCommentersNotifier < ApplicationNotifier
  deliver_by :email do |config|
    config.mailer = "CommentMailer"
    config.method = :new_comment_to_commenter
    config.if = -> { recipient.notification_preference? }
  end

  validates :record, presence: true
end
