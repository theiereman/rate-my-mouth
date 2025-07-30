class Tags::Queries::Index < QueryBase
  def initialize(params)
    @params = params
  end

  def call
    Tags::Models::Tag.filter(@params.slice(:name)).order(recipes_count: :desc)
  end
end
