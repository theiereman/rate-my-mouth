class Cooking::Infrastructure::Repositories::ActiveRecordUserRepository
  def find_by_ids(ids)
    return [] if ids.empty?

    Users::Models::User.where(id: ids).map do |db_user|
      user_to_entity(db_user)
    end
  end

  def find_by_id(id)
    db_user = Users::Models::User.find_by(id: id)
    return nil unless db_user

    user_to_entity(db_user)
  end

  private

  def user_to_entity(db_user)
    Cooking::Application::Results::Users::UserResult.new(
      id: db_user.id,
      username: db_user.username
    )
  end
end
