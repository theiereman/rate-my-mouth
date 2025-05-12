class NotificationMailerPreview < ActionMailer::Preview
  def new_comment_notification
    NotificationMailer.with(comment: Comment.first).new_comment_notification
  end

  def new_rating_notification
    NotificationMailer.with(rating: Rating.first).new_rating_notification
  end
end
