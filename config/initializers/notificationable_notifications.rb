ActiveSupport::Notifications.subscribe(/\.created.notificationable$|\.updated.notificationable$/) do |*args|
  event   = ActiveSupport::Notifications::Event.new(*args)
  user    = event.payload[:user]
  record  = event.payload[:record]
  next unless user.is_a?(User) && record

  # Méthode helper pour vérifier les conditions de notification
  def should_notify?(record, action_user)
    return false unless record.respond_to?(:recipe)

    recipe_owner = record.recipe.user
    return false if recipe_owner.id == action_user.id

    true
  end

  case event.name
  when /^comment/
    if should_notify?(record, user)
      NewCommentToAuthorNotifier.with(record: record).deliver
    end
    NewCommentToOtherCommentersNotifier.with(record: record, commenter: user).deliver(record.recipe.commenters.filter { |commenter| commenter.id != user.id && commenter.id != record.recipe.user.id })
  when /^rating/
    if should_notify?(record, record.user)
      NewRatingNotifier.with(record: record).deliver
    end
  end
end
