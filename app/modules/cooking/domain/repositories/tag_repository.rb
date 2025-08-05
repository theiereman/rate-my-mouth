class Cooking::Domain::Repositories::TagRepository
  def popular
    raise NotImplementedError
  end

  def search(name)
    raise NotImplementedError
  end

  def find_or_create_by_name(name, category: "general")
    raise NotImplementedError
  end
end
