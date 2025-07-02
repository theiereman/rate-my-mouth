# To deliver this notification:
#
# NewCommentNotifier.with(record: @comment).deliver
class NewCommentNotifier < ApplicationNotifier
  recipients -> { record.recipe.user }

  deliver_by :email do |config|
    config.mailer = "CommentMailer"
    config.method = :new_comment
    config.before_enqueue = -> { throw(:abort) unless record.recipe.user.notification_preference? && record.user != record.recipe.user }
  end

  validates :record, presence: true
end
