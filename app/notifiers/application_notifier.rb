class ApplicationNotifier < Noticed::Event
  enum :type, [
    :new_comment,
    :new_rating,
    :achievement_unlocked
  ]
end
